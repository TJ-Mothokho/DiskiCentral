/** API-Football v3 response types for players-statistics. */

export interface ApiPaging {
  current: number;
  total: number;
}

export interface FixturePlayerStatistics {
  team: { id: number; name: string; logo: string; update: string | null };
  players: Array<{ player: { id: number; name: string; photo: string }; statistics: Array<Record<string, unknown>> }>;
}
export type PlayersStatisticsResponse = PlayersStatisticsResponseEnvelope<FixturePlayerStatistics[]>;
export type PlayersStatisticsResponseEnvelope<T> = { get: "fixtures/players" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
