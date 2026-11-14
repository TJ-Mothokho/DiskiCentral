import { unstable_cache } from "next/cache";
import type { TeamsCountriesResponse } from "@/api/types/teams-countries.response";
import type { TeamsResponse } from "@/api/types/teams.response";
import type { TeamsSeasonsResponse } from "@/api/types/teams-seasons.response";
import type { TeamsStatisticsResponse } from "@/api/types/teams-statistics.response";
import { request } from "./request";

export interface GetTeamsParams { id?: number; name?: string; league?: number; season?: number; country?: string; code?: string; venue?: number; search?: string; }
const getCachedTeams = unstable_cache(
  (params: GetTeamsParams) => request<TeamsResponse>("teams", {
    id: params.id, name: params.name, league: params.league, season: params.season,
    country: params.country, code: params.code, venue: params.venue, search: params.search,
  }),
  ["teams"],
  { revalidate: 60 * 60 * 24 },
);
export async function getTeams(params: GetTeamsParams = {}): Promise<TeamsResponse> { return getCachedTeams(params); }

export interface GetTeamStatisticsParams { league: number; team: number; season: number; date?: string; }
const getCachedTeamStatistics = unstable_cache(
  (params: GetTeamStatisticsParams) => request<TeamsStatisticsResponse>("teams/statistics", {
    league: params.league, team: params.team, season: params.season, date: params.date,
  }),
  ["teams", "statistics"],
  { revalidate: 60 * 60 },
);
export async function getTeamStatistics(params: GetTeamStatisticsParams): Promise<TeamsStatisticsResponse> { return getCachedTeamStatistics(params); }

export interface GetTeamSeasonsParams { team: number; }
const getCachedTeamSeasons = unstable_cache(
  (params: GetTeamSeasonsParams) => request<TeamsSeasonsResponse>("teams/seasons", { team: params.team }),
  ["teams", "seasons"],
  { revalidate: 60 * 60 * 24 * 7 },
);
export async function getTeamSeasons(params: GetTeamSeasonsParams): Promise<TeamsSeasonsResponse> { return getCachedTeamSeasons(params); }

const getCachedTeamCountries = unstable_cache(
  () => request<TeamsCountriesResponse>("teams/countries"),
  ["teams", "countries"],
  { revalidate: 60 * 60 * 24 * 7 },
);
export async function getTeamCountries(): Promise<TeamsCountriesResponse> { return getCachedTeamCountries(); }
