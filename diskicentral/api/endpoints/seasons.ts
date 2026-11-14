import { unstable_cache } from "next/cache";
import type { SeasonsResponse } from "@/api/types/seasons.response";
import { request } from "./request";

const getCachedSeasons = unstable_cache(
  () => request<SeasonsResponse>("leagues/seasons"),
  ["leagues", "seasons"],
  { revalidate: 60 * 60 * 24 * 7 },
);

export async function getSeasons(): Promise<SeasonsResponse> {
  return getCachedSeasons();
}