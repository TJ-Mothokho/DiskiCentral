/** API-Football v3 response types for fixtures-statistics. */

import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export interface ApiPaging {
  current: number;
  total: number;
}

export interface FixtureStatisticsValue { type: string; value: string | number | null; }
export interface FixtureTeamStatistics { team: { id: number; name: string; logo: string }; statistics: FixtureStatisticsValue[]; }
export type FixturesStatisticsNoContentResponse =
  ApiNoContentResponse<"fixtures/statistics">;
export type FixturesStatisticsErrorResponse = ApiErrorResponse;
export interface FixturesStatisticsApiResponses {
  200: FixturesStatisticsResponseEnvelope<FixtureTeamStatistics[]>;
  204: FixturesStatisticsNoContentResponse;
  499: FixturesStatisticsErrorResponse;
  500: FixturesStatisticsErrorResponse;
}
export type FixturesStatisticsResponse =
  | FixturesStatisticsApiResponses[200]
  | FixturesStatisticsApiResponses[204];
export type FixturesStatisticsResponseEnvelope<T> = { get: "fixtures/statistics" | string; parameters: Record<string, string | number | boolean | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
