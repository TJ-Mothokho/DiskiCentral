/** API-Football v3 response types for players-profiles. */

import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export interface ApiPaging {
  current: number;
  total: number;
}

export type PlayersProfilesNoContentResponse =
  ApiNoContentResponse<"players/profiles">;
export type PlayersProfilesErrorResponse = ApiErrorResponse;
export interface PlayersProfilesApiResponses {
  200: PlayersProfilesResponseEnvelope<PlayerProfileItem[]>;
  204: PlayersProfilesNoContentResponse;
  499: PlayersProfilesErrorResponse;
  500: PlayersProfilesErrorResponse;
}
export type PlayersProfilesResponse =
  | PlayersProfilesApiResponses[200]
  | PlayersProfilesApiResponses[204];

export type PlayersProfilesResponseEnvelope<T> = { get: "players/profiles"; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };

export interface PlayerProfileItem {
  player: {
    id: number;
    name: string;
    firstname: string | null;
    lastname: string | null;
    age: number | null;
    birth: { date: string | null; place: string | null; country: string | null };
    nationality: string | null;
    height: string | null;
    weight: string | null;
    number: number | null;
    position: string | null;
    photo: string;
  };
}
