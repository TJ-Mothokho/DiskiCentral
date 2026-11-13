/** API-Football v3 response types for teams-statistics. */

export interface ApiPaging {
  current: number;
  total: number;
}

export interface TeamStatistics {
  league: { id: number; name: string; country: string; logo: string; flag: string; season: number };
  team: { id: number; name: string; logo: string };
  form: string | null;
  fixtures: { played: { home: number; away: number; total: number }; wins: { home: number; away: number; total: number }; draws: { home: number; away: number; total: number }; loses: { home: number; away: number; total: number }; };
  goals: TeamGoalStatistics;
  biggest: { streak: { wins: number; draws: number; loses: number }; wins: { home: string; away: string }; loses: { home: string; away: string }; goals: { for: { home: number; away: number }; against: { home: number; away: number } }; };
  clean_sheet: { home: number; away: number; total: number }; failed_to_score: { home: number; away: number; total: number }; penalty: Record<string, unknown>; lineups: Array<{ formation: string; played: number }>; cards: Record<string, unknown>;
}
export interface TeamGoalStatistics { for: GoalSplit; against: GoalSplit; }
export interface GoalSplit { total: { home: number; away: number; total: number }; average: { home: string; away: string; total: string }; minute: Record<string, { total: number | null; percentage: string | null }>; under_over: Record<string, { over: number; under: number }>; }
export type TeamsStatisticsResponse = TeamsStatisticsResponseEnvelope<TeamStatistics>;
export type TeamsStatisticsResponseEnvelope<T> = { get: "teams/statistics" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
