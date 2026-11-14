/** API-Football v3 response types for players-statistics. */

import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export interface ApiPaging {
  current: number;
  total: number;
}

export interface FixturePlayerStatistics {
  team: { id: number; name: string; logo: string; update: string | null };
  players: Array<{ player: { id: number; name: string; photo: string }; statistics: Array<Record<string, unknown>> }>;
}
export type PlayersStatisticsNoContentResponse =
  ApiNoContentResponse<"fixtures/players">;
export type PlayersStatisticsErrorResponse = ApiErrorResponse;
export interface PlayersStatisticsApiResponses {
  200: PlayersStatisticsResponseEnvelope<FixturePlayerStatistics[]>;
  204: PlayersStatisticsNoContentResponse;
  499: PlayersStatisticsErrorResponse;
  500: PlayersStatisticsErrorResponse;
}
export type PlayersStatisticsResponse =
  | PlayersStatisticsApiResponses[200]
  | PlayersStatisticsApiResponses[204];
export type PlayersStatisticsResponseEnvelope<T> = { get: "fixtures/players" | string; parameters: Record<string, string | number | boolean | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
