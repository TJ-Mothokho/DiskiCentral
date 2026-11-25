/** API-Football v3 response types for predictions. */

import type { ApiErrorResponse } from "./api-error.response";
import type { ApiNoContentResponse } from "./api-no-content.response";

export interface PredictionMinuteValue {
  total?: number | null;
  percentage?: string | null;
}

export type PredictionMinuteBreakdown = Record<
  string,
  PredictionMinuteValue | null
>;

export interface PredictionHomeAwayNumbers {
  home?: number | null;
  away?: number | null;
  total?: number | null;
}

export interface PredictionHomeAwayAverages {
  home?: string | null;
  away?: string | null;
  total?: string | null;
}

export interface PredictionGoalBreakdown {
  total?: PredictionHomeAwayNumbers | null;
  average?: PredictionHomeAwayAverages | null;
  minute?: PredictionMinuteBreakdown | null;
}

export interface PredictionRecord {
  total?: number | null;
  percentage?: string | null;
}

export interface PredictionTeamLeagueStats {
  form?: string | null;
  fixtures?: {
    played?: PredictionHomeAwayNumbers | null;
    wins?: PredictionHomeAwayNumbers | null;
    draws?: PredictionHomeAwayNumbers | null;
    loses?: PredictionHomeAwayNumbers | null;
  } | null;
  goals?: {
    for?: PredictionGoalBreakdown | null;
    against?: PredictionGoalBreakdown | null;
  } | null;
  clean_sheet?: PredictionHomeAwayNumbers | null;
  failed_to_score?: PredictionHomeAwayNumbers | null;
  penalty?: {
    total?: number | null;
    scored?: PredictionRecord | null;
    missed?: PredictionRecord | null;
  } | null;
  cards?: {
    yellow?: PredictionMinuteBreakdown | null;
    red?: PredictionMinuteBreakdown | null;
  } | null;
  lineups?: Array<{ formation: string; played: number }> | null;
}

export interface PredictionLastFive {
  form?: string | null;
  att?: string | null;
  def?: string | null;
  goals?: {
    for?: { total?: number | null; average?: string | null } | null;
    against?: { total?: number | null; average?: string | null } | null;
  } | null;
}

export interface FixtureTeamPrediction {
  id: number;
  name: string;
  logo: string;
  last_5?: PredictionLastFive | null;
  league?: PredictionTeamLeagueStats | null;
}

export interface Prediction {
  predictions: {
    winner?: {
      id?: number | null;
      name?: string | null;
      comment?: string | null;
    } | null;
    win_or_draw?: boolean | null;
    under_over?: string | null;
    goals?: { home?: string | null; away?: string | null } | null;
    advice?: string | null;
    percent?: {
      home?: string | null;
      draw?: string | null;
      away?: string | null;
    } | null;
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
  };
  teams: { home: FixtureTeamPrediction; away: FixtureTeamPrediction };
  comparison?: Record<
    string,
    { home?: string | null; away?: string | null } | null
  > | null;
  h2h?: unknown[];
}

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
export type PredictionsResponseEnvelope<T> = {
  get: "predictions" | string;
  parameters: Record<string, string | number | undefined>;
  errors: string[] | Record<string, string>;
  results: number;
  paging: ApiPaging;
  response: T;
};

export interface ApiPaging {
  current: number;
  total: number;
}
