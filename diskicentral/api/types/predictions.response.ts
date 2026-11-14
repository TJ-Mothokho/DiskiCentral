/** API-Football v3 response types for predictions. */

import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export interface ApiPaging {
  current: number;
  total: number;
}

export interface Prediction {
  predictions: { winner: { id: number | null; name: string | null; comment: string | null }; win_or_draw: boolean | null; under_over: string | null; goals: { home: string | null; away: string | null }; advice: string | null; percent: { home: string; draw: string; away: string }; };
  league: { id: number; name: string; country: string; logo: string; flag: string; season: number };
  teams: { home: FixtureTeamPrediction; away: FixtureTeamPrediction };
  comparison: Record<string, { home: string; away: string }>;
  h2h: unknown[];
}
export interface FixtureTeamPrediction { id: number; name: string; logo: string; last_5: { form: string; att: string; def: string; goals: { for: { total: number; average: string }; against: { total: number; average: string } } }; }
export type PredictionsNoContentResponse =
  ApiNoContentResponse<"predictions">;
export type PredictionsErrorResponse = ApiErrorResponse;
export interface PredictionsApiResponses {
  200: PredictionsResponseEnvelope<Prediction[]>;
  204: PredictionsNoContentResponse;
  499: PredictionsErrorResponse;
  500: PredictionsErrorResponse;
}
export type PredictionsResponse =
  | PredictionsApiResponses[200]
  | PredictionsApiResponses[204];
export type PredictionsResponseEnvelope<T> = { get: "predictions" | string; parameters: Record<string, string | number | undefined>; errors: string[] | Record<string, string>; results: number; paging: ApiPaging; response: T; };
