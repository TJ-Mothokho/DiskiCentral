import type { PlayersProfilesResponse } from "@/api/types/players-profiles.response";
import type { PlayersResponse } from "@/api/types/players.response";
import type { PlayersSeasonsResponse } from "@/api/types/players-seasons.response";
import type { PlayersSquadsResponse } from "@/api/types/players-squads.response";
import type { PlayersTeamsResponse } from "@/api/types/players-teams.response";
import type {
  TopAssistsResponse,
  TopRedCardsResponse,
  TopScorersResponse,
  TopYellowCardsResponse,
} from "@/api/types/top-scorers.response";
import { request } from "./request";

export interface GetPlayerSeasonsParams {
  player?: number;
}

export async function getPlayerSeasons(
  params: GetPlayerSeasonsParams = {},
): Promise<PlayersSeasonsResponse> {
  return request<PlayersSeasonsResponse>("players/seasons", {
    player: params.player,
  });
}

export interface GetPlayerProfilesParams {
  player?: number;
  search?: string;
  page?: number;
}

export async function getPlayerProfiles(
  params: GetPlayerProfilesParams = {},
): Promise<PlayersProfilesResponse> {
  return request<PlayersProfilesResponse>("players/profiles", {
    player: params.player,
    search: params.search,
    page: params.page,
  });
}

export interface GetPlayersParams {
  id?: number;
  season?: number;
  team?: number;
  league?: number;
  page?: number;
  search?: string;
}

export async function getPlayers(
  params: GetPlayersParams = {},
): Promise<PlayersResponse> {
  return request<PlayersResponse>("players", {
    id: params.id,
    season: params.season,
    team: params.team,
    league: params.league,
    page: params.page,
    search: params.search,
  });
}

export interface GetPlayerSquadsParams {
  team?: number;
  player?: number;
}

export async function getPlayerSquads(
  params: GetPlayerSquadsParams,
): Promise<PlayersSquadsResponse> {
  if (params.team === undefined && params.player === undefined) {
    throw new Error(
      "The player squads endpoint requires either a team or player parameter.",
    );
  }

  return request<PlayersSquadsResponse>("players/squads", {
    team: params.team,
    player: params.player,
  });
}

export interface GetPlayerTeamsParams {
  player: number;
}

export async function getPlayerTeams(
  params: GetPlayerTeamsParams,
): Promise<PlayersTeamsResponse> {
  return request<PlayersTeamsResponse>("players/teams", {
    player: params.player,
  });
}

export interface GetTopPlayersParams {
  league: number;
  season: number;
}

async function getTopPlayers(
  endpoint: string,
  params: GetTopPlayersParams,
): Promise<TopScorersResponse> {
  return request<TopScorersResponse>(endpoint, {
    league: params.league,
    season: params.season,
  });
}

export async function getTopScorers(
  params: GetTopPlayersParams,
): Promise<TopScorersResponse> {
  return getTopPlayers("players/topscorers", params);
}

export async function getTopAssists(
  params: GetTopPlayersParams,
): Promise<TopAssistsResponse> {
  return getTopPlayers("players/topassists", params);
}

export async function getTopYellowCards(
  params: GetTopPlayersParams,
): Promise<TopYellowCardsResponse> {
  return getTopPlayers("players/topyellowcards", params);
}

export async function getTopRedCards(
  params: GetTopPlayersParams,
): Promise<TopRedCardsResponse> {
  return getTopPlayers("players/topredcards", params);
}