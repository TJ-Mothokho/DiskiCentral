/** API-Football v3 response types for players-teams. */

import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export interface ApiPaging {
  current: number;
  total: number;
}

export interface PlayerTeamHistory { team: { id: number; name: string; logo: string }; seasons: number[]; }
export type PlayersTeamsNoContentResponse =
  ApiNoContentResponse<"players/teams">;
export type PlayersTeamsErrorResponse = ApiErrorResponse;
export interface PlayersTeamsApiResponses {
  200: PlayersTeamsResponseEnvelope<PlayerTeamHistory[]>;
  204: PlayersTeamsNoContentResponse;
  499: PlayersTeamsErrorResponse;
  500: PlayersTeamsErrorResponse;
}
export type PlayersTeamsResponse =
  | PlayersTeamsApiResponses[200]
  | PlayersTeamsApiResponses[204];

export type PlayersTeamsResponseEnvelope<T> = { get: "players/teams" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
