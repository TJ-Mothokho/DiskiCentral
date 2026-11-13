/** API-Football v3 response types for players-teams. */

export interface ApiPaging {
  current: number;
  total: number;
}

export interface PlayerTeamHistory { team: { id: number; name: string; logo: string }; seasons: number[]; }
export type PlayersTeamsResponse = PlayersTeamsResponseEnvelope<PlayerTeamHistory[]>;
export type PlayersTeamsResponseEnvelope<T> = { get: "players/teams" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
