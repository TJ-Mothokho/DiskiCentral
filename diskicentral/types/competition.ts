export type Competition = {
  id: string;
  name: string;
  slug: string;
  shortName: string | null;
  country: string;
  logo: string | null;
  season: string | null;
  format: number;
  colour: string | null;
  createdAt: string;
  updatedAt: string;
  teamIds: string[];
  seasonIds: string[];
};

export type AddCompetition = {
  name: string;
  slug: string;
  shortName: string | null;
  country: string;
  logo: string | null;
  season: string | null;
  format: number;
  colour: string | null;
};

export type UpdateCompetition = {
  name: string | null;
  slug: string | null;
  shortName: string | null;
  country: string | null;
  logo: string | null;
  season: string | null;
  format: number | null;
  colour: string | null;
};

export type GetAllCompetitionsResponse = {
  success: boolean;
  message: string;
  data: Competition[];
  errors: string[];
};

export type GetCompetitionResponse = {
  success: boolean;
  message: string;
  data: Competition;
  errors: string[];
};

export type BulkCompetitionLink = {
  competitionIds: string[];
};
