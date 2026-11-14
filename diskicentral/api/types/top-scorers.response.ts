/** API-Football v3 response types for top-scorers. */

import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export interface ApiPaging {
  current: number;
  total: number;
}

export interface TopScorer { player: { id: number; name: string; firstname: string | null; lastname: string | null; age: number | null; nationality: string | null; photo: string | null }; statistics: Array<Record<string, unknown>>; }
export type TopScoringEndpoint =
  | "players/topscorers"
  | "players/topassists"
  | "players/topyellowcards"
  | "players/topredcards";
export type TopScorersNoContentResponse =
  ApiNoContentResponse<TopScoringEndpoint>;
export type TopScorersErrorResponse = ApiErrorResponse;
export interface TopScorersApiResponses {
  200: TopScorersResponseEnvelope<TopScorer[]>;
  204: TopScorersNoContentResponse;
  499: TopScorersErrorResponse;
  500: TopScorersErrorResponse;
}
export type TopScorersResponse =
  | TopScorersApiResponses[200]
  | TopScorersApiResponses[204];

export type TopAssistsResponse = TopScorersResponse;
export type TopYellowCardsResponse = TopScorersResponse;
export type TopRedCardsResponse = TopScorersResponse;

export type TopScorersResponseEnvelope<T> = { get: "players/topscorers" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
