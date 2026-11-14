/** API-Football v3 response types for live-odds. */
import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export interface ApiPaging {
  current: number;
  total: number;
}

export interface LiveOddsLeague { id: number; season: number; }
export interface LiveOddsTeam { id: number; goals: number | null; }
export interface OddsValue { value: string | number; odd: string; handicap?: string | null; main?: boolean | null; suspended?: boolean; }
export interface OddsBet { id: number; name: string; values: OddsValue[]; }
export interface LiveOddsFixture { id: number; status: { long: string; elapsed: number | null; seconds: string | null }; }
export interface LiveOddsResponseItem {
  fixture: LiveOddsFixture;
  league: LiveOddsLeague;
  teams: { home: LiveOddsTeam; away: LiveOddsTeam };
  status: { stopped: boolean; blocked: boolean; finished: boolean };
  update: string;
  odds: OddsBet[];
}
export type LiveOddsNoContentResponse = ApiNoContentResponse<"odds/live">;
export type LiveOddsErrorResponse = ApiErrorResponse;
export type LiveOddsResponse = LiveOddsResponseEnvelope<LiveOddsResponseItem[]> | LiveOddsNoContentResponse;
export type LiveOddsResponseEnvelope<T> = { get: "odds/live"; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
