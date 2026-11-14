import { unstable_cache } from "next/cache";
import type { TrophiesResponse } from "@/api/types/trophies.response";
import { request } from "./request";
export interface GetTrophiesParams { player?: number; players?: string; coach?: number; coachs?: string; }
const getCachedTrophies = unstable_cache(
  (params: GetTrophiesParams) => request<TrophiesResponse>("trophies", {
    player: params.player, players: params.players, coach: params.coach, coachs: params.coachs,
  }),
  ["trophies"],
  { revalidate: 60 * 60 * 24 * 7 },
);
export async function getTrophies(params: GetTrophiesParams = {}): Promise<TrophiesResponse> { return getCachedTrophies(params); }
