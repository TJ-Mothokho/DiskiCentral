/** API-Football v3 response types for odds mapping. */

import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export interface ApiPaging {
  current: number;
  total: number;
}

export interface OddsMappingItem {
  league: {
    id: number;
    season: number;
  };
  fixture: {
    id: number;
    date: string;
    timestamp: number;
  };
  update: string;
}

export type OddsMappingNoContentResponse = ApiNoContentResponse<"odds/mapping">;
export type OddsMappingErrorResponse = ApiErrorResponse;
export type OddsMappingResponse =
  | OddsMappingResponseEnvelope<OddsMappingItem[]>
  | OddsMappingNoContentResponse;

export type OddsMappingResponseEnvelope<T> = {
  get: "odds/mapping";
  parameters: Record<string, string | number | undefined>;
  errors: string[] | Record<string, string>;
  results: number;
  paging: ApiPaging;
  response: T;
};
