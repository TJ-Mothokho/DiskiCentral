import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export type FixtureRoundsNoContentResponse =
  ApiNoContentResponse<"fixtures/rounds">;

export type FixtureRoundsErrorResponse = ApiErrorResponse;

export interface FixtureRoundsApiResponses {
  200: FixtureRoundsResponseEnvelope<string[]>;
  204: FixtureRoundsNoContentResponse;
  499: FixtureRoundsErrorResponse;
  500: FixtureRoundsErrorResponse;
}

export type FixtureRoundsResponse =
  | FixtureRoundsApiResponses[200]
  | FixtureRoundsApiResponses[204];

export type FixtureRoundsResponseEnvelope<T> = {
  get: "fixtures/rounds";
  parameters: Record<string, string | number | boolean | undefined>;
  errors: string[] | Record<string, string>;
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: T;
};
