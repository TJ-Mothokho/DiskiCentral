/** API-Football v3 response types for live-odds. */

export interface ApiPaging {
  current: number;
  total: number;
}

export interface FixtureLeague { id: number; name: string; country: string; logo: string; flag: string; season: number; round?: string; }
export interface FixtureTeam { id: number; name: string; logo: string; winner: boolean | null; }

export interface OddsValue { value: string; odd: string; handicap?: string | null; main?: boolean | null; suspended?: boolean; }
export interface OddsBet { id: number; name: string; values: OddsValue[]; }
export interface OddsBookmaker { id: number; name: string; bets: OddsBet[]; }
export interface OddsFixture { id: number; timezone?: string; date?: string; timestamp?: number; status?: { long: string; short: string; elapsed: number | null }; }
export interface OddsResponseItem { fixture: OddsFixture; league: FixtureLeague; teams: { home: FixtureTeam; away: FixtureTeam }; bookmakers: OddsBookmaker[]; }
export type LiveOddsResponse = LiveOddsResponseEnvelope<OddsResponseItem[]>;
export type LiveOddsResponseEnvelope<T> = { get: "odds/live" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
