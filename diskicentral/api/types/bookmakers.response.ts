/** API-Football v3 response types for bookmakers. */

export interface ApiPaging {
  current: number;
  total: number;
}

export interface Bookmaker { id: number; name: string; }
export type BookmakersResponse = BookmakersResponseEnvelope<Bookmaker[]>;
export type BookmakersResponseEnvelope<T> = { get: "odds/bookmakers" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
