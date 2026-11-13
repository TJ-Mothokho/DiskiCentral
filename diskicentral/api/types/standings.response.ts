/** API-Football v3 response types for standings. */

export interface ApiPaging {
  current: number;
  total: number;
}

export interface StandingsTeam { id: number; name: string; logo: string; }
export interface StandingsGoals { for: number; against: number; }
export interface StandingRecord { played: number; win: number; draw: number; lose: number; goals: StandingsGoals; }
export interface StandingRow {
  rank: number; team: StandingsTeam; points: number; goalsDiff: number; group: string;
  form: string | null; status: string | null; description: string | null;
  all: StandingRecord; home: StandingRecord; away: StandingRecord; update: string | null;
}
export interface StandingsLeague {
  id: number; name: string; country: string; logo: string; flag: string; season: number;
  standings: StandingRow[][];
}
export interface StandingsItem { league: StandingsLeague; }
export type StandingsResponse = StandingsResponseEnvelope<StandingsItem[]>;
export type StandingsResponseEnvelope<T> = {
  get: "standings" | string;
  parameters: Record<string, string | number | undefined>;
  errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T;
};
