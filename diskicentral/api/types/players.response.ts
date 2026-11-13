/** API-Football v3 response types for players. */

export interface ApiPaging {
  current: number;
  total: number;
}

export interface PlayerProfile { id: number; name: string; firstname: string | null; lastname: string | null; age: number | null; birth: { date: string | null; place: string | null; country: string | null }; nationality: string | null; height: string | null; weight: string | null; injured: boolean; photo: string; }
export interface PlayerStatisticsEntry { team: { id: number; name: string; logo: string }; league: { id: number; name: string; country: string; logo: string; flag: string; season: number }; games: Record<string, unknown>; substitutes: Record<string, unknown>; shots: Record<string, unknown>; goals: Record<string, unknown>; passes: Record<string, unknown>; tackles: Record<string, unknown>; duels: Record<string, unknown>; dribbles: Record<string, unknown>; fouls: Record<string, unknown>; cards: Record<string, unknown>; penalty: Record<string, unknown>; }
export interface PlayerResponseItem { player: PlayerProfile; statistics: PlayerStatisticsEntry[]; }
export type PlayersResponse = PlayersResponseEnvelope<PlayerResponseItem[]>;
export type PlayersResponseEnvelope<T> = { get: "players" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
