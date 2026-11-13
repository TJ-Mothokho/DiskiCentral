/** API-Football v3 response types for lineups. */

export interface ApiPaging {
  current: number;
  total: number;
}

export interface LineupPlayer {
  player: { id: number; name: string; number: number | null; pos: string | null; grid: string | null; };
  statistics?: Array<Record<string, unknown>>;
}
export interface TeamLineup { team: { id: number; name: string; logo: string }; coach: { id: number | null; name: string | null; photo: string | null }; formation: string | null; startXI: LineupPlayer[]; substitutes: LineupPlayer[]; }
export type LineupsResponse = LineupsResponseEnvelope<TeamLineup[]>;
export type LineupsResponseEnvelope<T> = { get: "fixtures/lineups" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
