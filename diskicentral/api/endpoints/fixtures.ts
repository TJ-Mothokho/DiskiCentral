import { unstable_cache } from "next/cache";
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
  timezone?: string;
}

const getCachedFixtureRounds = unstable_cache(
  (params: GetFixtureRoundsParams) =>
    request<FixtureRoundsResponse>("fixtures/rounds", {
      league: params.league,
      season: params.season,
      dates: params.dates,
      current: params.current,
      timezone: params.timezone,
    }),
  ["fixtures", "rounds"],
  { revalidate: 60 * 60 * 24 },
);

export async function getFixtureRounds(
  params: GetFixtureRoundsParams,
): Promise<FixtureRoundsResponse> {
  return getCachedFixtureRounds(params);
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

const requestFixtures = (params: GetFixturesParams) =>
  request<FixturesResponse>("fixtures", {
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

const getCachedFixtures = unstable_cache(
  requestFixtures,
  ["fixtures"],
  { revalidate: 60 * 60 },
);

const getCachedHistoricalFixtures = unstable_cache(
  requestFixtures,
  ["fixtures", "historical"],
  { revalidate: 60 * 60 * 24 },
);

export async function getFixtures(
  params: GetFixturesParams = {},
): Promise<FixturesResponse> {
  const historicalQuery =
    params.id !== undefined ||
    params.ids !== undefined ||
    (params.season !== undefined &&
      params.date === undefined &&
      params.live === undefined);

  return (historicalQuery ? getCachedHistoricalFixtures : getCachedFixtures)(
    params,
  );
}

export interface GetLiveFixturesParams {
  live?: string;
  timezone?: string;
}

const getCachedLiveFixtures = unstable_cache(
  (params: GetLiveFixturesParams) =>
    request<LiveResponse>("fixtures", {
      live: params.live ?? "all",
      timezone: params.timezone,
    }),
  ["fixtures", "live"],
  { revalidate: 15 },
);

export async function getLiveFixtures(
  params: GetLiveFixturesParams = {},
): Promise<LiveResponse> {
  return getCachedLiveFixtures(params);
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
  venue?: number;
  timezone?: string;
}

const getCachedHeadToHead = unstable_cache(
  (params: GetHeadToHeadParams) =>
    request<H2HResponse>("fixtures/headtohead", {
      h2h: params.h2h,
      date: params.date,
      league: params.league,
      season: params.season,
      last: params.last,
      next: params.next,
      from: params.from,
      to: params.to,
      status: params.status,
      venue: params.venue,
      timezone: params.timezone,
    }),
  ["fixtures", "headtohead"],
  { revalidate: 60 * 60 * 24 },
);

export async function getHeadToHead(
  params: GetHeadToHeadParams,
): Promise<H2HResponse> {
  return getCachedHeadToHead(params);
}

export interface GetFixtureStatisticsParams {
  fixture: number;
  half?: boolean;
  type?: string;
  team?: number;
}

const getCachedFixtureStatistics = unstable_cache(
  (params: GetFixtureStatisticsParams) =>
    request<FixturesStatisticsResponse>("fixtures/statistics", {
      fixture: params.fixture,
      half: params.half,
      type: params.type,
      team: params.team,
    }),
  ["fixtures", "statistics"],
  { revalidate: 60 },
);

export async function getFixtureStatistics(
  params: GetFixtureStatisticsParams,
): Promise<FixturesStatisticsResponse> {
  return getCachedFixtureStatistics(params);
}

export interface GetFixtureEventsParams {
  fixture: number;
  team?: number;
  player?: number;
  type?: string;
}

const getCachedFixtureEvents = unstable_cache(
  (params: GetFixtureEventsParams) =>
    request<EventsResponse>("fixtures/events", {
      fixture: params.fixture,
      team: params.team,
      player: params.player,
      type: params.type,
    }),
  ["fixtures", "events"],
  { revalidate: 60 },
);

export async function getFixtureEvents(
  params: GetFixtureEventsParams,
): Promise<EventsResponse> {
  return getCachedFixtureEvents(params);
}

export interface GetFixtureLineupsParams {
  fixture: number;
  team?: number;
  player?: number;
  type?: string;
}

const getCachedFixtureLineups = unstable_cache(
  (params: GetFixtureLineupsParams) =>
    request<LineupsResponse>("fixtures/lineups", {
      fixture: params.fixture,
      team: params.team,
      player: params.player,
      type: params.type,
    }),
  ["fixtures", "lineups"],
  { revalidate: 60 * 5 },
);

export async function getFixtureLineups(
  params: GetFixtureLineupsParams,
): Promise<LineupsResponse> {
  return getCachedFixtureLineups(params);
}

export interface GetFixturePlayersParams {
  fixture: number;
  team?: number;
}

const getCachedFixturePlayers = unstable_cache(
  (params: GetFixturePlayersParams) =>
    request<PlayersStatisticsResponse>("fixtures/players", {
      fixture: params.fixture,
      team: params.team,
    }),
  ["fixtures", "players"],
  { revalidate: 60 },
);

export async function getFixturePlayers(
  params: GetFixturePlayersParams,
): Promise<PlayersStatisticsResponse> {
  return getCachedFixturePlayers(params);
}

export interface GetPredictionsParams {
  fixture: number;
}

const getCachedPredictions = unstable_cache(
  (params: GetPredictionsParams) =>
    request<PredictionsResponse>("predictions", {
      fixture: params.fixture,
    }),
  ["predictions"],
  { revalidate: 60 * 60 },
);

export async function getPredictions(
  params: GetPredictionsParams,
): Promise<PredictionsResponse> {
  return getCachedPredictions(params);
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

const getCachedInjuries = unstable_cache(
  (params: GetInjuriesParams) =>
    request<InjuriesResponse>("injuries", {
      league: params.league,
      season: params.season,
      fixture: params.fixture,
      ids: params.ids,
      team: params.team,
      player: params.player,
      date: params.date,
      timezone: params.timezone,
    }),
  ["injuries"],
  { revalidate: 60 * 60 * 4 },
);

export async function getInjuries(
  params: GetInjuriesParams = {},
): Promise<InjuriesResponse> {
  return getCachedInjuries(params);
}
