/** API-Football v3 response types for sidelined. */

export interface ApiPaging {
  current: number;
  total: number;
}

export interface SidelinedEntry { type: string; start: string | null; end: string | null; reason: string | null; }
export interface PlayerSidelined { player: { id: number; name: string }; sidelined: SidelinedEntry[]; }
export type SidelinedResponse = SidelinedResponseEnvelope<PlayerSidelined[]>;
export type SidelinedResponseEnvelope<T> = { get: "sidelined" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
