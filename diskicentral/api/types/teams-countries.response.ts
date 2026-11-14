import type { ApiErrorResponse } from "./api-error.response";
import type { Country } from "./countries.response";
import type { TeamsNoContentResponse } from "./teams.response";

export type TeamsCountriesNoContentResponse = TeamsNoContentResponse;
export type TeamsCountriesErrorResponse = ApiErrorResponse;

export interface TeamsCountriesApiResponses {
  200: TeamsCountriesResponseEnvelope<Country[]>;
  204: TeamsCountriesNoContentResponse;
  499: TeamsCountriesErrorResponse;
  500: TeamsCountriesErrorResponse;
}

export type TeamsCountriesResponse =
  | TeamsCountriesApiResponses[200]
  | TeamsCountriesApiResponses[204];

export type TeamsCountriesResponseEnvelope<T> = {
  get: "teams/countries";
  parameters: [];
  errors: string[] | Record<string, string>;
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: T;
};
