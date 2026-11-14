/** API-Football v3 response types for players-squads. */

import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export interface ApiPaging {
  current: number;
  total: number;
}

export interface SquadPlayer { id: number; name: string; age: number | null; number: number | null; position: string | null; photo: string | null; };
export interface Squad { team: { id: number; name: string; logo: string }; players: SquadPlayer[]; }
export type PlayersSquadsNoContentResponse =
  ApiNoContentResponse<"players/squads">;
export type PlayersSquadsErrorResponse = ApiErrorResponse;
export interface PlayersSquadsApiResponses {
  200: PlayersSquadsResponseEnvelope<Squad[]>;
  204: PlayersSquadsNoContentResponse;
  499: PlayersSquadsErrorResponse;
  500: PlayersSquadsErrorResponse;
}
export type PlayersSquadsResponse =
  | PlayersSquadsApiResponses[200]
  | PlayersSquadsApiResponses[204];

export type PlayersSquadsResponseEnvelope<T> = { get: "players/squads" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
