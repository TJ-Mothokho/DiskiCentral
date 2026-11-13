/** API-Football v3 response types for countries. */

export interface ApiPaging {
  current: number;
  total: number;
}

export interface Country {
  name: string;
  code: string | null;
  flag: string | null;
}

export type CountriesResponse = CountriesResponseEnvelope<Country[]>;

export type CountriesResponseEnvelope<T> = {
  get: "countries" | string;
  parameters: Record<string, string | undefined>;
  errors: string[] | Record<string, string>;
  results: number;
  paging: ApiPaging;
  response: T;
};
