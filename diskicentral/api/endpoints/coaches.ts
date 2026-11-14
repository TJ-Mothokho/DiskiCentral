import { unstable_cache } from "next/cache";
import type { CoachesResponse } from "@/api/types/coaches.response";
import { request } from "./request";
export interface GetCoachesParams { id?: number; team?: number; search?: string; }
const getCachedCoaches = unstable_cache(
  (params: GetCoachesParams) => request<CoachesResponse>("coachs", { id: params.id, team: params.team, search: params.search }),
  ["coachs"],
  { revalidate: 60 * 60 * 24 },
);
export async function getCoaches(params: GetCoachesParams = {}): Promise<CoachesResponse> { return getCachedCoaches(params); }
