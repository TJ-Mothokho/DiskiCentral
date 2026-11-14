/** API-Football v3 response types for sidelined. */
import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export interface ApiPaging {
  current: number;
  total: number;
}

export interface SidelinedEntry { type: string; start: string | null; end: string | null; }
export type SidelinedNoContentResponse = ApiNoContentResponse<"sidelined">;
export type SidelinedErrorResponse = ApiErrorResponse;
export type SidelinedResponse =
  | SidelinedResponseEnvelope<SidelinedEntry[]>
  | SidelinedNoContentResponse;
export type SidelinedResponseEnvelope<T> = { get: "sidelined"; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
