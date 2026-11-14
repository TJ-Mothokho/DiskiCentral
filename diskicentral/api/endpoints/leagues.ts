import { unstable_cache } from "next/cache";
import type { LeaguesResponse } from "@/api/types/leagues.response";
import { request } from "./request";

export interface GetLeaguesParams {
  id?: number;
  name?: string;
  country?: string;
  code?: string;
  season?: number;
  team?: number;
  type?: string;
  current?: boolean;
  search?: string;
  last?: number;
}

const getCachedLeagues = unstable_cache(
  (params: GetLeaguesParams) =>
    request<LeaguesResponse>("leagues", {
      id: params.id,
      name: params.name,
      country: params.country,
      code: params.code,
      season: params.season,
      team: params.team,
      type: params.type,
      current: params.current,
      search: params.search,
      last: params.last,
    }),
  ["leagues"],
  { revalidate: 60 * 15 },
);

export async function getLeagues(
  params: GetLeaguesParams = {},
): Promise<LeaguesResponse> {
  return getCachedLeagues(params);
}