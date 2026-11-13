/** API-Football v3 response types for injuries. */

export interface ApiPaging {
  current: number;
  total: number;
}

export interface Injury { player: { id: number; name: string; photo: string | null; }; team: { id: number; name: string; logo: string }; fixture: { id: number; timezone: string; date: string; timestamp: number }; league: { id: number; season: number; name: string; country: string; logo: string; flag: string }; type: string; reason: string | null; }
export type InjuriesResponse = InjuriesResponseEnvelope<Injury[]>;
export type InjuriesResponseEnvelope<T> = { get: "injuries" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
