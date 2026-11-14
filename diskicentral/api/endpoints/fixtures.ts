import type { EventsResponse } from "@/api/types/events.response";
import type { FixtureRoundsResponse } from "@/api/types/fixtures-rounds.response";
import type { FixturesResponse } from "@/api/types/fixtures.response";
import type { FixturesStatisticsResponse } from "@/api/types/fixtures-statistics.response";
import type { H2HResponse } from "@/api/types/h2h.response";
import type { InjuriesResponse } from "@/api/types/injuries.response";
import type { LineupsResponse } from "@/api/types/lineups.response";
import type { LiveResponse } from "@/api/types/live.response";
import type { PlayersStatisticsResponse } from "@/api/types/players-statistics.response";
import type { PredictionsResponse } from "@/api/types/predictions.response";
import { request } from "./request";

export interface GetFixtureRoundsParams {
  league: number;
  season: number;
  dates?: boolean;
  current?: boolean;
}

export async function getFixtureRounds(
  params: GetFixtureRoundsParams,
): Promise<FixtureRoundsResponse> {
  return request<FixtureRoundsResponse>("fixtures/rounds", {
    league: params.league,
    season: params.season,
    dates: params.dates,
    current: params.current,
  });
}

export interface GetFixturesParams {
  id?: number;
  ids?: string;
  live?: string;
  league?: number;
  season?: number;
  date?: string;
  next?: number;
  last?: number;
  venue?: number;
  status?: string;
  team?: number;
  timezone?: string;
  from?: string;
  to?: string;
  round?: string;
}

export async function getFixtures(
  params: GetFixturesParams = {},
): Promise<FixturesResponse> {
  return request<FixturesResponse>("fixtures", {
    id: params.id,
    ids: params.ids,
    live: params.live,
    league: params.league,
    season: params.season,
    date: params.date,
    next: params.next,
    last: params.last,
    venue: params.venue,
    status: params.status,
    team: params.team,
    timezone: params.timezone,
    from: params.from,
    to: params.to,
    round: params.round,
  });
}

export interface GetLiveFixturesParams {
  live?: string;
  timezone?: string;
}

export async function getLiveFixtures(
  params: GetLiveFixturesParams = {},
): Promise<LiveResponse> {
  return request<LiveResponse>("fixtures", {
    live: params.live ?? "all",
    timezone: params.timezone,
  });
}

export interface GetHeadToHeadParams {
  h2h: string;
  date?: string;
  league?: number;
  season?: number;
  last?: number;
  next?: number;
  from?: string;
  to?: string;
  status?: string;
  timezone?: string;
}

export async function getHeadToHead(
  params: GetHeadToHeadParams,
): Promise<H2HResponse> {
  return request<H2HResponse>("fixtures/headtohead", {
    h2h: params.h2h,
    date: params.date,
    league: params.league,
    season: params.season,
    last: params.last,
    next: params.next,
    from: params.from,
    to: params.to,
    status: params.status,
    timezone: params.timezone,
  });
}

export interface GetFixtureStatisticsParams {
  fixture: number;
  half?: boolean;
  type?: string;
  team?: number;
}

export async function getFixtureStatistics(
  params: GetFixtureStatisticsParams,
): Promise<FixturesStatisticsResponse> {
  return request<FixturesStatisticsResponse>("fixtures/statistics", {
    fixture: params.fixture,
    half: params.half,
    type: params.type,
    team: params.team,
  });
}

export interface GetFixtureEventsParams {
  fixture: number;
  team?: number;
  player?: number;
  type?: string;
}

export async function getFixtureEvents(
  params: GetFixtureEventsParams,
): Promise<EventsResponse> {
  return request<EventsResponse>("fixtures/events", {
    fixture: params.fixture,
    team: params.team,
    player: params.player,
    type: params.type,
  });
}

export interface GetFixtureLineupsParams {
  fixture: number;
  team?: number;
  player?: number;
  type?: string;
}

export async function getFixtureLineups(
  params: GetFixtureLineupsParams,
): Promise<LineupsResponse> {
  return request<LineupsResponse>("fixtures/lineups", {
    fixture: params.fixture,
    team: params.team,
    player: params.player,
    type: params.type,
  });
}

export interface GetFixturePlayersParams {
  fixture: number;
  team?: number;
}

export async function getFixturePlayers(
  params: GetFixturePlayersParams,
): Promise<PlayersStatisticsResponse> {
  return request<PlayersStatisticsResponse>("fixtures/players", {
    fixture: params.fixture,
    team: params.team,
  });
}

export interface GetPredictionsParams {
  fixture: number;
}

export async function getPredictions(
  params: GetPredictionsParams,
): Promise<PredictionsResponse> {
  return request<PredictionsResponse>("predictions", {
    fixture: params.fixture,
  });
}

export interface GetInjuriesParams {
  league?: number;
  season?: number;
  fixture?: number;
  ids?: string;
  team?: number;
  player?: number;
  date?: string;
  timezone?: string;
}

export async function getInjuries(
  params: GetInjuriesParams = {},
): Promise<InjuriesResponse> {
  return request<InjuriesResponse>("injuries", {
    league: params.league,
    season: params.season,
    fixture: params.fixture,
    ids: params.ids,
    team: params.team,
    player: params.player,
    date: params.date,
    timezone: params.timezone,
  });
}