/** API-Football v3 response types for transfers. */

export interface ApiPaging {
  current: number;
  total: number;
}

export interface Transfer { date: string; type: string; teams: { in: { id: number; name: string; logo: string }; out: { id: number; name: string; logo: string } };} 
export interface PlayerTransfers { player: { id: number; name: string }; transfers: Transfer[]; }
export type TransfersResponse = TransfersResponseEnvelope<PlayerTransfers[]>;
export type TransfersResponseEnvelope<T> = { get: "transfers" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
