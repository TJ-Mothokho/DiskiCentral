/** API-Football v3 response types for countries. */

import type { ApiErrorResponse } from "./api-error.response";

export interface ApiPaging {
  current: number;
  total: number;
}

export interface Country {
  name: string;
  code: string | null;
  flag: string | null;
}

export interface CountriesNoContentResponse {
  get: "countries";
  parameters: [];
  errors: {
    time: string;
    bug: string;
    report: "countries";
  };
  results: 0;
  paging: ApiPaging;
  response: [];
}

export type CountriesErrorResponse = ApiErrorResponse;

export interface CountriesApiResponses {
  200: CountriesResponseEnvelope<Country[]>;
  204: CountriesNoContentResponse;
  499: CountriesErrorResponse;
  500: CountriesErrorResponse;
}

export type CountriesResponse =
  | CountriesApiResponses[200]
  | CountriesApiResponses[204];

export type CountriesResponseEnvelope<T> = {
  get: "countries" | string;
  parameters: Record<string, string | undefined>;
  errors: string[] | Record<string, string>;
  results: number;
  paging: ApiPaging;
  response: T;
};
