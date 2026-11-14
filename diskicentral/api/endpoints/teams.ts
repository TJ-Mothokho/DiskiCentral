import type { TeamsCountriesResponse } from "@/api/types/teams-countries.response";
import type { TeamsResponse } from "@/api/types/teams.response";
import type { TeamsSeasonsResponse } from "@/api/types/teams-seasons.response";
import type { TeamsStatisticsResponse } from "@/api/types/teams-statistics.response";
import { request } from "./request";

export interface GetTeamsParams {
  id?: number;
  name?: string;
  league?: number;
  season?: number;
  country?: string;
  code?: string;
  venue?: number;
  search?: string;
}

export async function getTeams(
  params: GetTeamsParams = {},
): Promise<TeamsResponse> {
  return request<TeamsResponse>("teams", {
    id: params.id,
    name: params.name,
    league: params.league,
    season: params.season,
    country: params.country,
    code: params.code,
    venue: params.venue,
    search: params.search,
  });
}

export interface GetTeamStatisticsParams {
  league: number;
  team: number;
  season: number;
  date?: string;
}

export async function getTeamStatistics(
  params: GetTeamStatisticsParams,
): Promise<TeamsStatisticsResponse> {
  return request<TeamsStatisticsResponse>("teams/statistics", {
    league: params.league,
    team: params.team,
    season: params.season,
    date: params.date,
  });
}

export interface GetTeamSeasonsParams {
  team: number;
}

export async function getTeamSeasons(
  params: GetTeamSeasonsParams,
): Promise<TeamsSeasonsResponse> {
  return request<TeamsSeasonsResponse>("teams/seasons", {
    team: params.team,
  });
}

export async function getTeamCountries(): Promise<TeamsCountriesResponse> {
  return request<TeamsCountriesResponse>("teams/countries");
}