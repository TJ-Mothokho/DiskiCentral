export type GetAllResultsResponse = {
  success: boolean;
  message: string;
  data: Result[];
  errors: string[];
};

export type GetResultResponse = {
  success: boolean;
  message: string;
  data: Result;
  errors: string[];
};

export type Result = {
  id: string;
  fixtureId: string;
  homeScore: 1;
  awayScore: 1;
  createdAt: string;
  updatedAt: string;
};

export type AddResult = {
  fixtureId: string;
  homeScore: 1;
  awayScore: 1;
};

export type UpdateResult = {
  homeScore: 1;
  awayScore: 1;
};
