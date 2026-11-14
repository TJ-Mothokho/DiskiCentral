import { unstable_cache } from "next/cache";
import type { VenuesResponse } from "@/api/types/venues.response";
import { request } from "./request";
export interface GetVenuesParams { id?: number; name?: string; city?: string; country?: string; search?: string; }
const getCachedVenues = unstable_cache(
  (params: GetVenuesParams) => request<VenuesResponse>("venues", {
    id: params.id, name: params.name, city: params.city, country: params.country, search: params.search,
  }),
  ["venues"],
  { revalidate: 60 * 60 * 24 * 7 },
);
export async function getVenues(params: GetVenuesParams = {}): Promise<VenuesResponse> { return getCachedVenues(params); }
