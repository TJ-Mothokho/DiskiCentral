import { getFixtureEvents, getFixtureStatistics, getLiveFixtures } from "@/api/endpoints/fixtures";
import { getLiveOdds } from "@/api/endpoints/odds";
import type { EventsResponse } from "@/api/types/events.response";
import type { FixturesStatisticsResponse } from "@/api/types/fixtures-statistics.response";
import type { Fixture, LiveResponse } from "@/api/types/live.response";
import type { LiveOddsResponse } from "@/api/types/live-odds.response";
import { LiveGameBroadcaster } from "./live-game-broadcaster";
import type { LiveGameListener } from "./live-game.types";

export interface LiveGameDataSource {
  getLiveFixtures: typeof getLiveFixtures;
  getFixture?: (params: { id: number }) => Promise<import("@/api/types/fixtures.response").FixturesResponse>;
  getFixtureEvents: typeof getFixtureEvents;
  getFixtureStatistics: typeof getFixtureStatistics;
  getLiveOdds: typeof getLiveOdds;
}

export const apiFootballLiveGameDataSource: LiveGameDataSource = {
  getLiveFixtures,
  getFixture: async (params) => (await import("@/api/endpoints/fixtures")).getFixtures(params),
  getFixtureEvents,
  getFixtureStatistics,
  getLiveOdds,
};

export interface LiveGamePollerOptions {
  /** Default 60 seconds; the endpoint-level caches still prevent duplicate upstream calls. */
  pollIntervalMs?: number;
  /** Events are always collected; statistics are optional to protect the daily quota. */
  includeStatistics?: boolean;
  /** Live odds are opt-in because they refresh much more frequently. */
  includeOdds?: boolean;
  /** Reserve part of the 7,500 daily allowance for ordinary application requests. */
  maxApiCallsPerDay?: number;
}

interface FixtureSubscriberState {
  count: number;
  missingPolls: number;
  endedPublished: boolean;
}

function payload<T>(value: unknown): T | undefined {
  if (!value || typeof value !== "object" || !("response" in value)) return undefined;
  return (value as { response: T }).response;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown upstream error";
}

export class LiveGamePoller {
  private readonly broadcaster: LiveGameBroadcaster;
  private readonly dataSource: LiveGameDataSource;
  private readonly options: Required<LiveGamePollerOptions>;
  private readonly subscribers = new Map<number, FixtureSubscriberState>();
  private timer: ReturnType<typeof setInterval> | undefined;
  private pollInFlight = false;
  private budgetDay = new Date().toISOString().slice(0, 10);
  private estimatedCallsToday = 0;
  private stoppedForBudget = false;

  constructor(
    options: LiveGamePollerOptions = {},
    dependencies: {
      broadcaster?: LiveGameBroadcaster;
      dataSource?: LiveGameDataSource;
    } = {},
  ) {
    this.options = {
      pollIntervalMs: options.pollIntervalMs ?? 60_000,
      includeStatistics: options.includeStatistics ?? true,
      includeOdds: options.includeOdds ?? false,
      maxApiCallsPerDay: options.maxApiCallsPerDay ?? 6_000,
    };
    this.broadcaster = dependencies.broadcaster ?? new LiveGameBroadcaster();
    this.dataSource = dependencies.dataSource ?? apiFootballLiveGameDataSource;
  }

  subscribe(fixtureId: number, listener: LiveGameListener): () => void {
    if (!Number.isInteger(fixtureId) || fixtureId <= 0) {
      throw new Error("fixtureId must be a positive integer.");
    }

    const state = this.subscribers.get(fixtureId) ?? {
      count: 0,
      missingPolls: 0,
      endedPublished: false,
    };
    state.count += 1;
    state.missingPolls = 0;
    state.endedPublished = false;
    this.subscribers.set(fixtureId, state);
    const unsubscribeListener = this.broadcaster.subscribe(fixtureId, listener);
    this.start();

    return () => {
      unsubscribeListener();
      const current = this.subscribers.get(fixtureId);
      if (!current) return;
      current.count -= 1;
      if (current.count <= 0) this.subscribers.delete(fixtureId);
      if (this.subscribers.size === 0) this.stop();
    };
  }

  start(): void {
    if (this.timer || this.subscribers.size === 0) return;
    void this.poll();
    this.timer = setInterval(() => void this.poll(), this.options.pollIntervalMs);
  }

  stop(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = undefined;
  }

  async poll(): Promise<void> {
    if (this.pollInFlight || this.subscribers.size === 0) return;
    this.pollInFlight = true;
    try {
      this.resetBudgetIfNeeded();
      const fixtureIds = [...this.subscribers.keys()];
      const estimatedCost = 1 + fixtureIds.length * (1 + (this.options.includeStatistics ? 1 : 0) + (this.options.includeOdds ? 1 : 0));
      if (this.estimatedCallsToday + estimatedCost > this.options.maxApiCallsPerDay) {
        this.stoppedForBudget = true;
        for (const fixtureId of fixtureIds) {
          this.broadcaster.publish({
            type: "error",
            fixtureId,
            updatedAt: new Date().toISOString(),
            code: "DAILY_BUDGET_REACHED",
            message: "The live-game poller paused to preserve the configured daily API budget.",
          });
        }
        return;
      }
      this.estimatedCallsToday += estimatedCost;

      let liveFixtures: LiveResponse;
      try {
        liveFixtures = await this.dataSource.getLiveFixtures({ live: "all" });
      } catch (error) {
        this.publishUpstreamFailure(fixtureIds, error);
        return;
      }

      if (!liveFixtures || typeof liveFixtures !== "object" || !("response" in liveFixtures)) {
        for (const fixtureId of fixtureIds) {
          this.broadcaster.publish({
            type: "error",
            fixtureId,
            updatedAt: new Date().toISOString(),
            code: "UPSTREAM_UNAVAILABLE",
            message: "The live-fixture response was incomplete.",
          });
        }
        return;
      }

      const fixtures = payload<Fixture[]>(liveFixtures) ?? [];
      const fixturesById = new Map(fixtures.map((fixture) => [fixture.fixture.id, fixture]));

      await Promise.all(fixtureIds.map(async (fixtureId) => {
        const fixture = fixturesById.get(fixtureId);
        const state = this.subscribers.get(fixtureId);
        if (!state) return;

        if (!fixture) {
          state.missingPolls += 1;
          if (state.missingPolls >= 3 && !state.endedPublished) {
            const canLookup = this.estimatedCallsToday < this.options.maxApiCallsPerDay;
            if (canLookup) {
              this.estimatedCallsToday += 1;
              try {
                const lookup = await this.dataSource.getFixture?.({ id: fixtureId });
                const authoritative = lookup?.response?.[0];
                if (authoritative && ["FT", "AET", "PEN"].includes(authoritative.fixture.status.short)) {
                  state.endedPublished = true;
                  this.broadcaster.publish({ type: "ended", fixtureId, updatedAt: new Date().toISOString() });
                }
              } catch (error) {
                this.broadcaster.publish({
                  type: "error",
                  fixtureId,
                  updatedAt: new Date().toISOString(),
                  code: "UPSTREAM_UNAVAILABLE",
                  message: errorMessage(error),
                });
              }
            }
          }
          return;
        }
        state.missingPolls = 0;
        if (["FT", "AET", "PEN", "CANC", "ABD", "AWD", "WO"].includes(fixture.fixture.status.short)) {
          if (!state.endedPublished) {
            state.endedPublished = true;
            this.broadcaster.publish({ type: "ended", fixtureId, updatedAt: new Date().toISOString() });
          }
          return;
        }
        state.endedPublished = false;

        const [eventsResult, statisticsResult, oddsResult] = await Promise.allSettled([
          this.dataSource.getFixtureEvents({ fixture: fixtureId }),
          this.options.includeStatistics
            ? this.dataSource.getFixtureStatistics({ fixture: fixtureId })
            : Promise.resolve(undefined),
          this.options.includeOdds
            ? this.dataSource.getLiveOdds({ fixture: fixtureId })
            : Promise.resolve(undefined),
        ]);

        const warnings: string[] = [];
        const events = this.extractArray<EventsResponse, "events">(eventsResult, warnings, "events");
        const statistics = this.extractArray<FixturesStatisticsResponse, "statistics">(statisticsResult, warnings, "statistics");
        const odds = this.extractArray<LiveOddsResponse, "odds">(oddsResult, warnings, "odds");

        this.broadcaster.publish({
          type: "snapshot",
          fixtureId,
          updatedAt: new Date().toISOString(),
          fixture,
          events,
          statistics,
          ...(this.options.includeOdds ? { odds } : {}),
          ...(warnings.length > 0 ? { warnings } : {}),
        });
      }));
    } finally {
      this.pollInFlight = false;
    }
  }

  private publishUpstreamFailure(fixtureIds: number[], error: unknown): void {
    for (const fixtureId of fixtureIds) {
      this.broadcaster.publish({
        type: "error",
        fixtureId,
        updatedAt: new Date().toISOString(),
        code: "UPSTREAM_UNAVAILABLE",
        message: errorMessage(error),
      });
    }
  }

  private extractArray<T, K extends string>(
    result: PromiseSettledResult<T | undefined>,
    warnings: string[],
    label: K,
  ): K extends "events" ? import("@/api/types/events.response").FixtureEvent[] : K extends "statistics" ? import("@/api/types/fixtures-statistics.response").FixtureTeamStatistics[] : import("@/api/types/live-odds.response").LiveOddsResponseItem[] {
    if (result.status === "rejected") {
      warnings.push(`${label}: ${errorMessage(result.reason)}`);
      return [] as never;
    }
    return (payload<unknown[]>(result.value) ?? []) as never;
  }

  private resetBudgetIfNeeded(): void {
    const day = new Date().toISOString().slice(0, 10);
    if (day !== this.budgetDay) {
      this.budgetDay = day;
      this.estimatedCallsToday = 0;
      this.stoppedForBudget = false;
    }
  }

  get status(): { running: boolean; subscriberCount: number; estimatedCallsToday: number; stoppedForBudget: boolean } {
    return {
      running: this.timer !== undefined,
      subscriberCount: this.broadcaster.subscriberCount(),
      estimatedCallsToday: this.estimatedCallsToday,
      stoppedForBudget: this.stoppedForBudget,
    };
  }
}
