/** API-Football v3 response types for injuries. */

import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export interface ApiPaging {
  current: number;
  total: number;
}

export interface Injury {
  player: {
    id: number;
    name: string;
    photo: string | null;
    type: string;
    reason: string | null;
  };
  team: { id: number; name: string; logo: string };
  fixture: { id: number; timezone: string; date: string; timestamp: number };
  league: {
    id: number;
    season: number;
    name: string;
    country: string;
    logo: string;
    flag: string | null;
  };
}
export type InjuriesNoContentResponse = ApiNoContentResponse<"injuries">;
export type InjuriesErrorResponse = ApiErrorResponse;
export interface InjuriesApiResponses {
  200: InjuriesResponseEnvelope<Injury[]>;
  204: InjuriesNoContentResponse;
  499: InjuriesErrorResponse;
  500: InjuriesErrorResponse;
}
export type InjuriesResponse =
  | InjuriesApiResponses[200]
  | InjuriesApiResponses[204];
export type InjuriesResponseEnvelope<T> = { get: "injuries" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
