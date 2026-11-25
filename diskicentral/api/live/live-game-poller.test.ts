import { describe, expect, it, vi } from "vitest";
import { LiveGameBroadcaster } from "./live-game-broadcaster";
import {
  LiveGamePoller,
  type LiveGameDataSource,
} from "./live-game-poller";

function liveEnvelope(response: unknown[]) {
  return {
    get: "fixtures",
    parameters: { live: "all" },
    errors: {},
    results: response.length,
    paging: { current: 1, total: 1 },
    response,
  };
}

describe("LiveGamePoller", () => {
  it("does not overlap polling cycles", async () => {
    let resolveLive: ((value: unknown) => void) | undefined;
    const dataSource = {
      getLiveFixtures: vi.fn(() => new Promise((resolve) => {
        resolveLive = resolve;
      })),
      getFixtureEvents: vi.fn(),
      getFixtureStatistics: vi.fn(),
      getLiveOdds: vi.fn(),
    } as unknown as LiveGameDataSource;
    const poller = new LiveGamePoller({
      pollIntervalMs: 60_000,
    }, { dataSource });
    const unsubscribe = poller.subscribe(12, () => undefined);
    poller.stop();

    const first = poller.poll();
    await poller.poll();
    expect(dataSource.getLiveFixtures).toHaveBeenCalledTimes(1);

    resolveLive?.(liveEnvelope([]));
    await first;
    unsubscribe();
  });

  it("pauses at the configured budget and recovers after a UTC day reset", async () => {
    const dataSource = {
      getLiveFixtures: vi.fn(async () => liveEnvelope([])),
      getFixtureEvents: vi.fn(),
      getFixtureStatistics: vi.fn(),
      getLiveOdds: vi.fn(),
    } as unknown as LiveGameDataSource;
    const poller = new LiveGamePoller({
      maxApiCallsPerDay: 0,
      includeStatistics: false,
    }, { dataSource });
    const unsubscribe = poller.subscribe(15, () => undefined);

    poller.stop();
    await poller.poll();
    expect(poller.status.stoppedForBudget).toBe(true);
    unsubscribe();
  });

  it("does not publish ended after a single missing live-fixture response", async () => {
    const ended = vi.fn();
    const broadcaster = new LiveGameBroadcaster();
    const dataSource = {
      getLiveFixtures: vi.fn(async () => liveEnvelope([])),
      getFixture: vi.fn(async () => ({
        response: [{ fixture: { status: { short: "1H" } } }],
      })),
      getFixtureEvents: vi.fn(),
      getFixtureStatistics: vi.fn(),
      getLiveOdds: vi.fn(),
    } as unknown as LiveGameDataSource;
    const poller = new LiveGamePoller({
      includeStatistics: false,
    }, { broadcaster, dataSource });
    poller.subscribe(18, (update) => {
      if (update.type === "ended") ended();
    });
    poller.stop();

    await poller.poll();
    expect(ended).not.toHaveBeenCalled();
  });
});
