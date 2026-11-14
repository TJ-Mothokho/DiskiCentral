import { unstable_cache } from "next/cache";
import type { SidelinedResponse } from "@/api/types/sidelined.response";
import { request } from "./request";
export interface GetSidelinedParams { player?: number; players?: string; coach?: number; coachs?: string; }
const getCachedSidelined = unstable_cache(
  (params: GetSidelinedParams) => request<SidelinedResponse>("sidelined", {
    player: params.player, players: params.players, coach: params.coach, coachs: params.coachs,
  }),
  ["sidelined"],
  { revalidate: 60 * 60 * 4 },
);
export async function getSidelined(params: GetSidelinedParams = {}): Promise<SidelinedResponse> { return getCachedSidelined(params); }
