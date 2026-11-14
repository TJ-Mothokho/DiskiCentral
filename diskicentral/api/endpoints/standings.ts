
import { unstable_cache } from "next/cache";
import type { StandingsResponse } from "@/api/types/standings.response";
import { request } from "./request";

export interface GetStandingsParams {
  season: number;
  league?: number;
  team?: number;
}

const getCachedStandings = unstable_cache(
  (params: GetStandingsParams) =>
    request<StandingsResponse>("standings", {
      league: params.league,
      team: params.team,
      season: params.season,
    }),
  ["standings"],
  { revalidate: 60 * 60 },
);

export async function getStandings(
  params: GetStandingsParams,
): Promise<StandingsResponse> {
  if (!params.league && !params.team) {
    throw new Error(
      "The standings endpoint requires either a league or team parameter.",
    );
  }

  return getCachedStandings(params);
}
