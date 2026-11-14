/** API-Football v3 response types for teams. */

import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export interface ApiPaging {
  current: number;
  total: number;
}

export interface Team { id: number; name: string; code: string | null; country: string; founded: number | null; national: boolean; logo: string; }
export interface TeamVenue { id: number; name: string; address: string | null; city: string; capacity: number | null; surface: string | null; image: string | null; }
export interface TeamResponseItem { team: Team; venue: TeamVenue; }
export type TeamsNoContentResponse = ApiNoContentResponse<
  "teams",
  "teams?id=33",
  { id: number }
>;
export type TeamsErrorResponse = ApiErrorResponse;
export interface TeamsApiResponses {
  200: TeamsResponseEnvelope<TeamResponseItem[]>;
  204: TeamsNoContentResponse;
  499: TeamsErrorResponse;
  500: TeamsErrorResponse;
}
export type TeamsResponse =
  | TeamsApiResponses[200]
  | TeamsApiResponses[204];

export type TeamsResponseEnvelope<T> = { get: "teams" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
