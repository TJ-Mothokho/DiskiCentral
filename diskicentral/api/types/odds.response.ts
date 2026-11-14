/** API-Football v3 response types for odds. */
import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export interface ApiPaging {
  current: number;
  total: number;
}

export interface FixtureLeague { id: number; name: string; country: string; logo: string; flag: string | null; season: number; }
export interface OddsValue { value: string | number; odd: string; handicap?: string | null; main?: boolean | null; suspended?: boolean; }
export interface OddsBet { id: number; name: string; values: OddsValue[]; }
export interface OddsBookmaker { id: number; name: string; bets: OddsBet[]; }
export interface OddsFixture { id: number; timezone: string; date: string; timestamp: number; }
export interface OddsResponseItem { league: FixtureLeague; fixture: OddsFixture; update: string; bookmakers: OddsBookmaker[]; }
export type OddsNoContentResponse = ApiNoContentResponse<"odds">;
export type OddsErrorResponse = ApiErrorResponse;
export type OddsResponse = OddsResponseEnvelope<OddsResponseItem[]> | OddsNoContentResponse;
export type OddsResponseEnvelope<T> = { get: "odds"; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
