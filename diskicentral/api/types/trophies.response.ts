/** API-Football v3 response types for trophies. */

export interface ApiPaging {
  current: number;
  total: number;
}

export interface Trophy { league: string; country: string; season: string; place: string; }
export interface PlayerTrophies { player: { id: number; name: string }; trophies: Trophy[]; }
export type TrophiesResponse = TrophiesResponseEnvelope<PlayerTrophies[]>;
export type TrophiesResponseEnvelope<T> = { get: "trophies" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
