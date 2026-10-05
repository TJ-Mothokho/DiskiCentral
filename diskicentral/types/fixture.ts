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
  status: number;
  homeScore: number | null;
  awayScore: number | null;
  createdAt: string;
  updatedAt: string;
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
