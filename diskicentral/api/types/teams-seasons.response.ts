import type { ApiErrorResponse } from "./api-error.response";
import type { TeamsNoContentResponse } from "./teams.response";
import type { SeasonYear } from "./seasons.response";

export type TeamsSeasonsNoContentResponse = TeamsNoContentResponse;
export type TeamsSeasonsErrorResponse = ApiErrorResponse;

export interface TeamsSeasonsApiResponses {
  200: TeamsSeasonsResponseEnvelope<SeasonYear[]>;
  204: TeamsSeasonsNoContentResponse;
  499: TeamsSeasonsErrorResponse;
  500: TeamsSeasonsErrorResponse;
}

export type TeamsSeasonsResponse =
  | TeamsSeasonsApiResponses[200]
  | TeamsSeasonsApiResponses[204];

export type TeamsSeasonsResponseEnvelope<T> = {
  get: "teams/seasons";
  parameters: Record<string, string | number | undefined>;
  errors: string[] | Record<string, string>;
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: T;
};
