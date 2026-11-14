/** API-Football v3 response types for seasons. */

import type { ApiErrorResponse } from "./api-error.response";

export interface ApiPaging {
  current: number;
  total: number;
}

/** The four-digit starting year used as the API season key (for example, 2018). */
export type SeasonYear = number;

export interface SeasonsNoContentResponse {
  get: "leagues/seasons";
  parameters: [];
  errors: {
    time: string;
    bug: string;
    report: "leagues/seasons";
  };
  results: 0;
  paging: ApiPaging;
  response: [];
}

export type SeasonsErrorResponse = ApiErrorResponse;

export interface SeasonsApiResponses {
  200: SeasonsResponseEnvelope<SeasonYear[]>;
  204: SeasonsNoContentResponse;
  499: SeasonsErrorResponse;
  500: SeasonsErrorResponse;
}

export type SeasonsResponse =
  | SeasonsApiResponses[200]
  | SeasonsApiResponses[204];

export type SeasonsResponseEnvelope<T> = {
  get: "leagues/seasons" | string;
  parameters: [];
  errors: string[] | Record<string, string>;
  results: number;
  paging: ApiPaging;
  response: T;
};
