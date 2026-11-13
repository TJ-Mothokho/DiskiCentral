/** API-Football v3 response types for top-scorers. */

export interface ApiPaging {
  current: number;
  total: number;
}

export interface TopScorer { player: { id: number; name: string; firstname: string | null; lastname: string | null; age: number | null; nationality: string | null; photo: string | null }; statistics: Array<Record<string, unknown>>; }
export type TopScorersResponse = TopScorersResponseEnvelope<TopScorer[]>;
export type TopScorersResponseEnvelope<T> = { get: "players/topscorers" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
