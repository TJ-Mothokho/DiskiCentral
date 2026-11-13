/** API-Football v3 response types for seasons. */

export interface ApiPaging {
  current: number;
  total: number;
}

export type SeasonsResponse = SeasonsResponseEnvelope<number[]>;

export type SeasonsResponseEnvelope<T> = {
  get: "leagues/seasons" | string;
  parameters: Record<string, never>;
  errors: string[] | Record<string, string>;
  results: number;
  paging: ApiPaging;
  response: T;
};
