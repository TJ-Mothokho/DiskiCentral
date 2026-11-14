import { unstable_cache } from "next/cache";
import type { BetsResponse } from "@/api/types/bets.response";
import type { BookmakersResponse } from "@/api/types/bookmakers.response";
import type { LiveOddsResponse } from "@/api/types/live-odds.response";
import type { OddsMappingResponse } from "@/api/types/odds-mapping.response";
import type { OddsResponse } from "@/api/types/odds.response";
import type { PreMatchesOddsResponse } from "@/api/types/pre-matches-odds.response";
import { request } from "./request";

export interface GetPreMatchOddsParams {
  fixture?: number; league?: number; season?: number; date?: string;
  timezone?: string; page?: number; bookmaker?: number; bet?: number;
}
const getCachedPreMatchOdds = unstable_cache(
  (params: GetPreMatchOddsParams) => request<PreMatchesOddsResponse>("odds", {
    fixture: params.fixture, league: params.league, season: params.season,
    date: params.date, timezone: params.timezone, page: params.page,
    bookmaker: params.bookmaker, bet: params.bet,
  }),
  ["odds", "pre-match"],
  { revalidate: 60 * 60 * 3 },
);
export async function getPreMatchOdds(params: GetPreMatchOddsParams = {}): Promise<PreMatchesOddsResponse> {
  return getCachedPreMatchOdds(params);
}

export interface GetLiveOddsParams { fixture?: number; league?: number; bet?: number; }
const getCachedLiveOdds = unstable_cache(
  (params: GetLiveOddsParams) => request<LiveOddsResponse>("odds/live", {
    fixture: params.fixture, league: params.league, bet: params.bet,
  }),
  ["odds", "live"],
  { revalidate: 15 },
);
export async function getLiveOdds(params: GetLiveOddsParams = {}): Promise<LiveOddsResponse> {
  return getCachedLiveOdds(params);
}

export interface GetOddsMappingParams { page?: number; }
const getCachedOddsMapping = unstable_cache(
  (params: GetOddsMappingParams) => request<OddsMappingResponse>("odds/mapping", { page: params.page }),
  ["odds", "mapping"],
  { revalidate: 60 * 60 * 24 },
);
export async function getOddsMapping(params: GetOddsMappingParams = {}): Promise<OddsMappingResponse> {
  return getCachedOddsMapping(params);
}

export interface GetBookmakersParams { id?: number; search?: string; }
const getCachedBookmakers = unstable_cache(
  (params: GetBookmakersParams) => request<BookmakersResponse>("odds/bookmakers", { id: params.id, search: params.search }),
  ["odds", "bookmakers"],
  { revalidate: 60 * 60 * 24 * 7 },
);
export async function getBookmakers(params: GetBookmakersParams = {}): Promise<BookmakersResponse> {
  return getCachedBookmakers(params);
}

export interface GetBetsParams { id?: string; search?: string; }
const getCachedBets = unstable_cache(
  (params: GetBetsParams) => request<BetsResponse>("odds/bets", { id: params.id, search: params.search }),
  ["odds", "bets"],
  { revalidate: 60 * 60 * 24 * 7 },
);
export async function getBets(params: GetBetsParams = {}): Promise<BetsResponse> {
  return getCachedBets(params);
}

export const getOdds = getPreMatchOdds;
export type GetOddsParams = GetPreMatchOddsParams;
export type GetOddsResponse = OddsResponse;
