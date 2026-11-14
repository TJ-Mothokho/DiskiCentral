/** API-Football v3 response types for bookmakers. */
import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export interface ApiPaging {
  current: number;
  total: number;
}

export interface Bookmaker { id: number; name: string; }
export type BookmakersNoContentResponse = ApiNoContentResponse<"odds/bookmakers">;
export type BookmakersErrorResponse = ApiErrorResponse;
export type BookmakersResponse = BookmakersResponseEnvelope<Bookmaker[]> | BookmakersNoContentResponse;
export type BookmakersResponseEnvelope<T> = { get: "odds/bookmakers"; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
