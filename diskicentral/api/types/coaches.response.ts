/** API-Football v3 response types for coaches. */
import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export interface ApiPaging {
  current: number;
  total: number;
}

export interface Coach { id: number; name: string; firstname: string | null; lastname: string | null; age: number | null; birth: { date: string | null; place: string | null; country: string | null }; nationality: string | null; height: string | null; weight: string | null; photo: string | null; team: { id: number; name: string; logo: string }; career: Array<{ team: { id: number; name: string; logo: string }; start: string | null; end: string | null }>; }
export type CoachesNoContentResponse = ApiNoContentResponse<"coachs">;
export type CoachesErrorResponse = ApiErrorResponse;
export type CoachesResponse =
  | CoachesResponseEnvelope<Coach[]>
  | CoachesNoContentResponse;
export type CoachesResponseEnvelope<T> = { get: "coachs"; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
