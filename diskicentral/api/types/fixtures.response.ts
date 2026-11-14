/** API-Football v3 response types for fixtures. */

import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export interface ApiPaging {
  current: number;
  total: number;
}

export interface FixtureStatus {
  long: string;
  short: string;
  elapsed: number | null;
  extra: number | null;
}

export interface FixturePeriod {
  first: number | null;
  second: number | null;
}

export interface FixtureVenue {
  id: number | null;
  name: string | null;
  city: string | null;
}

export interface FixtureReferee {
  name: string | null;
  country: string | null;
  nationality: string | null;
}

export interface FixtureInfo {
  id: number;
  referee: FixtureReferee | null;
  timezone: string;
  date: string;
  timestamp: number;
  periods: FixturePeriod;
  venue: FixtureVenue;
  status: FixtureStatus;
}

export interface FixtureLeague {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
  standings?: boolean;
}

export interface FixtureTeam {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
}

export interface FixtureScore {
  halftime: { home: number | null; away: number | null };
  fulltime: { home: number | null; away: number | null };
  extratime: { home: number | null; away: number | null };
  penalty: { home: number | null; away: number | null };
}

export interface Fixture {
  fixture: FixtureInfo;
  league: FixtureLeague;
  teams: { home: FixtureTeam; away: FixtureTeam };
  goals: { home: number | null; away: number | null };
  score: FixtureScore;
}
export type FixturesNoContentResponse = ApiNoContentResponse<"fixtures">;
export type FixturesErrorResponse = ApiErrorResponse;

export interface FixturesApiResponses {
  200: FixturesResponseEnvelope<Fixture[]>;
  204: FixturesNoContentResponse;
  499: FixturesErrorResponse;
  500: FixturesErrorResponse;
}

export type FixturesResponse =
  | FixturesApiResponses[200]
  | FixturesApiResponses[204];

export type FixturesResponseEnvelope<T> = {
  get: "fixtures" | string;
  parameters: Record<string, string | number | boolean | undefined>;
  errors: string[] | Record<string, string>;
  results: number;
  paging: ApiPaging;
  response: T;
};
