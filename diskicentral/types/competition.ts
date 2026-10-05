export type Competition = {
  id: string;
  name: string;
  slug: string;
  apiId: number | null;
  fotmobLink: string | null;
  shortName: string | null;
  country: string;
  logo: string | null;
  logoRaw: string | null;
  logoRawMimeType: string | null;
  season: string | null;
  format: number;
  primarycolour: string | null;
  secondarycolour: string | null;
  tertiarycolour: string | null;
  createdAt: string;
  updatedAt: string;
  teamIds: string[];
  seasonIds: string[];
};

export type AddCompetition = {
  name: string;
  slug: string;
  apiId: number | null;
  fotmobLink: string | null;
  shortName: string | null;
  country: string;
  logo: string | null;
  logoRaw: File | null;
  season: string | null;
  format: CompetitionFormat;
  primarycolour: string | null;
  secondarycolour: string | null;
  tertiarycolour: string | null;
};

export type UpdateCompetition = {
  name: string | null;
  slug: string | null;
  apiId: number | null;
  fotmobLink: string | null;
  shortName: string | null;
  country: string | null;
  logo: string | null;
  logoRaw: File | null;
  season: string | null;
  format: CompetitionFormat | null;
  primarycolour: string | null;
  secondarycolour: string | null;
  tertiarycolour: string | null;
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

export enum CompetitionFormat {
  League = 0,
  Knockout = 1,
}