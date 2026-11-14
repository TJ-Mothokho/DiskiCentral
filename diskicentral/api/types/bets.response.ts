/** API-Football v3 response types for bets. */
import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export interface ApiPaging {
  current: number;
  total: number;
}

export interface BetDefinition { id: number; name: string; }
export type BetsNoContentResponse = ApiNoContentResponse<"odds/bets">;
export type BetsErrorResponse = ApiErrorResponse;
export type BetsResponse = BetsResponseEnvelope<BetDefinition[]> | BetsNoContentResponse;
export type BetsResponseEnvelope<T> = { get: "odds/bets"; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
