/** API-Football v3 response types for venues. */
import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export interface ApiPaging {
  current: number;
  total: number;
}

export interface Venue {
  id: number; name: string; address: string | null; city: string; country: string;
  capacity: number | null; surface: string | null; image: string | null;
}
export type VenuesNoContentResponse = ApiNoContentResponse<"venues">;
export type VenuesErrorResponse = ApiErrorResponse;
export type VenuesResponse =
  | VenuesResponseEnvelope<Venue[]>
  | VenuesNoContentResponse;
export type VenuesResponseEnvelope<T> = { get: "venues"; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
