/** API-Football v3 response types for leagues. */

export interface ApiPaging {
  current: number;
  total: number;
}

export interface LeagueCoverage {
  fixtures: {
    events: boolean;
    lineups: boolean;
    statistics_fixtures: boolean;
    statistics_players: boolean;
  };
  standings: boolean;
  players: boolean;
  top_scorers: boolean;
  top_assists: boolean;
  top_cards: boolean;
  injuries: boolean;
  predictions: boolean;
  odds: {
    season: number;
    bookmakers: boolean;
    pre_match: boolean;
    in_play: boolean;
    fixtures: {
      bookmakers: boolean;
      statistics: boolean;
      events: boolean;
      lineups: boolean;
      players_statistics: boolean;
    };
  };
}

export interface League {
  id: number;
  name: string;
  type: string;
  logo: string;
}

export interface LeagueSeason {
  year: number;
  start: string;
  end: string;
  current: boolean;
  coverage: LeagueCoverage;
}

export interface LeagueResponseItem {
  league: League;
  country: CountryReference;
  seasons: LeagueSeason[];
}

export interface CountryReference {
  name: string;
  code: string | null;
  flag: string | null;
}

export type LeaguesResponse = LeaguesResponseEnvelope<LeagueResponseItem[]>;

export type LeaguesResponseEnvelope<T> = {
  get: "leagues" | string;
  parameters: Record<string, string | number | boolean | undefined>;
  errors: string[] | Record<string, string>;
  results: number;
  paging: ApiPaging;
  response: T;
};
