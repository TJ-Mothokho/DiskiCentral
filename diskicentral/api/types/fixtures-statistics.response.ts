/** API-Football v3 response types for fixtures-statistics. */

export interface ApiPaging {
  current: number;
  total: number;
}

export interface FixtureStatisticsValue { type: string; value: string | number | null; }
export interface FixtureTeamStatistics { team: { id: number; name: string; logo: string }; statistics: FixtureStatisticsValue[]; }
export type FixturesStatisticsResponse = FixturesStatisticsResponseEnvelope<FixtureTeamStatistics[]>;
export type FixturesStatisticsResponseEnvelope<T> = { get: "fixtures/statistics" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
