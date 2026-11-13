/** API-Football v3 response types for venues. */

export interface ApiPaging {
  current: number;
  total: number;
}

export interface Venue {
  id: number; name: string; address: string | null; city: string; country: string;
  capacity: number | null; surface: string | null; image: string | null;
}
export type VenuesResponse = VenuesResponseEnvelope<Venue[]>;
export type VenuesResponseEnvelope<T> = { get: "venues" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
