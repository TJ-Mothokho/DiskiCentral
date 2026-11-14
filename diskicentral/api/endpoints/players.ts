import { unstable_cache } from "next/cache";
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
  TopScoringEndpoint,
} from "@/api/types/top-scorers.response";
import { request } from "./request";

export interface GetPlayerSeasonsParams { player?: number; }
const getCachedPlayerSeasons = unstable_cache(
  (params: GetPlayerSeasonsParams) => request<PlayersSeasonsResponse>("players/seasons", { player: params.player }),
  ["players", "seasons"],
  { revalidate: 60 * 60 * 24 * 7 },
);
export async function getPlayerSeasons(params: GetPlayerSeasonsParams = {}): Promise<PlayersSeasonsResponse> {
  return getCachedPlayerSeasons(params);
}

export interface GetPlayerProfilesParams { player?: number; search?: string; page?: number; }
const getCachedPlayerProfiles = unstable_cache(
  (params: GetPlayerProfilesParams) => request<PlayersProfilesResponse>("players/profiles", {
    player: params.player, search: params.search, page: params.page,
  }),
  ["players", "profiles"],
  { revalidate: 60 * 60 * 24 * 7 },
);
export async function getPlayerProfiles(params: GetPlayerProfilesParams = {}): Promise<PlayersProfilesResponse> {
  return getCachedPlayerProfiles(params);
}

export interface GetPlayersParams { id?: number; season?: number; team?: number; league?: number; page?: number; search?: string; }
const getCachedPlayers = unstable_cache(
  (params: GetPlayersParams) => request<PlayersResponse>("players", {
    id: params.id, season: params.season, team: params.team, league: params.league,
    page: params.page, search: params.search,
  }),
  ["players"],
  { revalidate: 60 * 60 },
);
export async function getPlayers(params: GetPlayersParams = {}): Promise<PlayersResponse> {
  return getCachedPlayers(params);
}

export interface GetPlayerSquadsParams { team?: number; player?: number; }
const getCachedPlayerSquads = unstable_cache(
  (params: GetPlayerSquadsParams) => request<PlayersSquadsResponse>("players/squads", {
    team: params.team, player: params.player,
  }),
  ["players", "squads"],
  { revalidate: 60 * 60 * 6 },
);
export async function getPlayerSquads(params: GetPlayerSquadsParams): Promise<PlayersSquadsResponse> {
  if (params.team === undefined && params.player === undefined) {
    throw new Error("The player squads endpoint requires either a team or player parameter.");
  }
  return getCachedPlayerSquads(params);
}

export interface GetPlayerTeamsParams { player: number; }
const getCachedPlayerTeams = unstable_cache(
  (params: GetPlayerTeamsParams) => request<PlayersTeamsResponse>("players/teams", { player: params.player }),
  ["players", "teams"],
  { revalidate: 60 * 60 * 24 },
);
export async function getPlayerTeams(params: GetPlayerTeamsParams): Promise<PlayersTeamsResponse> {
  return getCachedPlayerTeams(params);
}

export interface GetTopPlayersParams { league: number; season: number; }
async function getTopPlayers(endpoint: TopScoringEndpoint, params: GetTopPlayersParams): Promise<TopScorersResponse | TopAssistsResponse | TopYellowCardsResponse | TopRedCardsResponse> {
  return request<TopScorersResponse | TopAssistsResponse | TopYellowCardsResponse | TopRedCardsResponse>(endpoint, {
    league: params.league, season: params.season,
  });
}
const getCachedTopPlayers = unstable_cache(
  (params: { endpoint: TopScoringEndpoint; values: GetTopPlayersParams }) => getTopPlayers(params.endpoint, params.values),
  ["players", "top"],
  { revalidate: 60 * 60 },
);
export async function getTopScorers(params: GetTopPlayersParams): Promise<TopScorersResponse> {
  return getCachedTopPlayers({ endpoint: "players/topscorers", values: params }) as Promise<TopScorersResponse>;
}
export async function getTopAssists(params: GetTopPlayersParams): Promise<TopAssistsResponse> {
  return getCachedTopPlayers({ endpoint: "players/topassists", values: params }) as Promise<TopAssistsResponse>;
}
export async function getTopYellowCards(params: GetTopPlayersParams): Promise<TopYellowCardsResponse> {
  return getCachedTopPlayers({ endpoint: "players/topyellowcards", values: params }) as Promise<TopYellowCardsResponse>;
}
export async function getTopRedCards(params: GetTopPlayersParams): Promise<TopRedCardsResponse> {
  return getCachedTopPlayers({ endpoint: "players/topredcards", values: params }) as Promise<TopRedCardsResponse>;
}
