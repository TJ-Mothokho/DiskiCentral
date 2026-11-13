/** API-Football v3 response types for bets. */

export interface ApiPaging {
  current: number;
  total: number;
}

export interface BetDefinition { id: number; name: string; values: string[]; }
export type BetsResponse = BetsResponseEnvelope<BetDefinition[]>;
export type BetsResponseEnvelope<T> = { get: "odds/bets" | "odds/live/bets" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
