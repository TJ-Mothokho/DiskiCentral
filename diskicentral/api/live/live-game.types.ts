import type { FixtureEvent } from "@/api/types/events.response";
import type { FixtureTeamStatistics } from "@/api/types/fixtures-statistics.response";
import type { Fixture } from "@/api/types/live.response";
import type { LiveOddsResponseItem } from "@/api/types/live-odds.response";

export interface LiveGameSnapshot {
  type: "snapshot";
  fixtureId: number;
  updatedAt: string;
  fixture: Fixture;
  events: FixtureEvent[];
  statistics: FixtureTeamStatistics[];
  odds?: LiveOddsResponseItem[];
  warnings?: string[];
}

export interface LiveGameEnded {
  type: "ended";
  fixtureId: number;
  updatedAt: string;
}

export interface LiveGameError {
  type: "error";
  fixtureId?: number;
  updatedAt: string;
  code: "UPSTREAM_UNAVAILABLE" | "DAILY_BUDGET_REACHED";
  message: string;
}

export type LiveGameUpdate = LiveGameSnapshot | LiveGameEnded | LiveGameError;
export type LiveGameListener = (update: LiveGameUpdate) => void;
