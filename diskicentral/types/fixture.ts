export type GetAllFixturesResponse = {
  success: boolean;
  message: string;
  data: Fixture[];
  errors: string[];
};

export type GetFixtureResponse = {
  success: boolean;
  message: string;
  data: Fixture;
  errors: string[];
};

export type Fixture = {
  id: string;
  competitionId: string;
  homeTeamId: string;
  awayTeamId: string;
  apiId: number | null;
  fotmobLink: string | null;
  kickoff: string;
  venue: string | null;
  status: FixtureStatus;
  homeScore: number | null;
  awayScore: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  competitionName: string | null;
  homeTeamName: string | null;
  awayTeamName: string | null;
};

export type AddFixture = {
  competitionId: string;
  homeTeamId: string;
  awayTeamId: string;
  apiId: number | null;
  fotmobLink: string | null;
  kickoff: string;
  venue: string | null;
  status: FixtureStatus;
  homeScore: number | null;
  awayScore: number | null;
};

export type UpdateFixture = {
  competitionId: string | null;
  homeTeamId: string | null;
  awayTeamId: string | null;
  apiId: number | null;
  fotmobLink: string | null;
  kickoff: string | null;
  venue: string | null;
  status: FixtureStatus | null;
  homeScore: number | null;
  awayScore: number | null;
};

export enum FixtureStatus {
  Scheduled = 0,
  Live = 1,
  HalfTime = 2,
  Finished = 3,
  Postponed = 4,
  Cancelled = 5,
}

export interface FeedFixture {
  round: string;
  roundName: string;
  pageUrl: string;
  id: string;
  home: {
    name: string;
    shortName: string;
    id: string;
  };
  away: {
    name: string;
    shortName: string;
    id: string;
  };
  status: {
    utcTime: string;
    timezone: string | null;
    finished: boolean;
    started: boolean;
    cancelled: boolean;
    awarded: boolean;
    scoreStr: string | null;
    reason: {
      short: string;
      shortKey: string;
      long: string;
      longKey: string;
    } | null;
  };
}

export interface FixtureResponse {
  success: boolean;
  message: string;
  data: {
    source: string;
    source_url: string;
    league_id: string;
    league_name: string;
    season: string;
    page_url: string;
    first_unplayed_match: {
      firstUnplayedMatchIndex: number;
      firstUnplayedMatchId: string;
    };
    has_ongoing_match: boolean;
    fixture_info: {
      rounds: object[];
      teams: { id: number; name: string }[];
      groups: object[];
    };
    fixtures: FeedFixture[];
  };
  errors: string[];
}
