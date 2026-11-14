import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";
import type { SeasonYear } from "./seasons.response";

export type PlayersSeasonsNoContentResponse =
  ApiNoContentResponse<"players/seasons">;
export type PlayersSeasonsErrorResponse = ApiErrorResponse;

export interface PlayersSeasonsApiResponses {
  200: PlayersSeasonsResponseEnvelope<SeasonYear[]>;
  204: PlayersSeasonsNoContentResponse;
  499: PlayersSeasonsErrorResponse;
  500: PlayersSeasonsErrorResponse;
}

export type PlayersSeasonsResponse =
  | PlayersSeasonsApiResponses[200]
  | PlayersSeasonsApiResponses[204];

export type PlayersSeasonsResponseEnvelope<T> = {
  get: "players/seasons";
  parameters: Record<string, string | number | undefined> | [];
  errors: string[] | Record<string, string>;
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: T;
};
