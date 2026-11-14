/** API-Football v3 response types for lineups. */

import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export interface ApiPaging {
  current: number;
  total: number;
}

export interface LineupPlayer {
  player: { id: number; name: string; number: number | null; pos: string | null; grid: string | null; };
  statistics?: Array<Record<string, unknown>>;
}
export interface TeamLineup { team: { id: number; name: string; logo: string }; coach: { id: number | null; name: string | null; photo: string | null }; formation: string | null; startXI: LineupPlayer[]; substitutes: LineupPlayer[]; }
export type LineupsNoContentResponse =
  ApiNoContentResponse<"fixtures/lineups">;
export type LineupsErrorResponse = ApiErrorResponse;
export interface LineupsApiResponses {
  200: LineupsResponseEnvelope<TeamLineup[]>;
  204: LineupsNoContentResponse;
  499: LineupsErrorResponse;
  500: LineupsErrorResponse;
}
export type LineupsResponse =
  | LineupsApiResponses[200]
  | LineupsApiResponses[204];
export type LineupsResponseEnvelope<T> = { get: "fixtures/lineups" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
