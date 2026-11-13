/** API-Football v3 response types for players-squads. */

export interface ApiPaging {
  current: number;
  total: number;
}

export interface SquadPlayer { id: number; name: string; age: number | null; number: number | null; position: string | null; photo: string | null; };
export interface Squad { team: { id: number; name: string; logo: string }; players: SquadPlayer[]; }
export type PlayersSquadsResponse = PlayersSquadsResponseEnvelope<Squad[]>;
export type PlayersSquadsResponseEnvelope<T> = { get: "players/squads" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
