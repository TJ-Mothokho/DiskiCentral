/** API-Football v3 response types for trophies. */
import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export interface ApiPaging {
  current: number;
  total: number;
}

export interface Trophy { league: string; country: string; season: string; place: string; }
export type TrophiesNoContentResponse = ApiNoContentResponse<"trophies">;
export type TrophiesErrorResponse = ApiErrorResponse;
export type TrophiesResponse =
  | TrophiesResponseEnvelope<Trophy[]>
  | TrophiesNoContentResponse;
export type TrophiesResponseEnvelope<T> = { get: "trophies"; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
