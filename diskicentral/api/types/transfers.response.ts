/** API-Football v3 response types for transfers. */

import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export interface ApiPaging {
  current: number;
  total: number;
}

export interface Transfer { date: string; type: string; teams: { in: { id: number; name: string; logo: string }; out: { id: number; name: string; logo: string } };} 
export interface PlayerTransfers { player: { id: number; name: string }; transfers: Transfer[]; }
export type TransfersNoContentResponse =
  ApiNoContentResponse<"transfers">;
export type TransfersErrorResponse = ApiErrorResponse;

export interface TransfersApiResponses {
  200: TransfersResponseEnvelope<PlayerTransfers[]>;
  204: TransfersNoContentResponse;
  499: TransfersErrorResponse;
  500: TransfersErrorResponse;
}

export type TransfersResponse =
  | TransfersApiResponses[200]
  | TransfersApiResponses[204];

export type TransfersResponseEnvelope<T> = { get: "transfers" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
