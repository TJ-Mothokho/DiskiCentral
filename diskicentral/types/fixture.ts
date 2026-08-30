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
  kickoff: string;
  venue: string | null;
  status: number;
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
  kickoff: string;
  venue: string | null;
  status: number;
};

export type UpdateFixture = {
  competitionId: string | null;
  homeTeamId: string | null;
  awayTeamId: string | null;
  kickoff: string | null;
  venue: string | null;
  status: number | null;
};
