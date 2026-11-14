import { unstable_cache } from "next/cache";
import type { CountriesResponse } from "@/api/types/countries.response";
import { request } from "./request";

export interface GetCountriesParams {
  name?: string;
  code?: string;
  search?: string;
}

const getCachedCountries = unstable_cache(
  (params: GetCountriesParams) =>
    request<CountriesResponse>("countries", {
      name: params.name,
      code: params.code,
      search: params.search,
    }),
  ["countries"],
  { revalidate: 60 * 60 * 24 * 7 },
);

export async function getCountries(
  params: GetCountriesParams = {},
): Promise<CountriesResponse> {
  return getCachedCountries(params);
}