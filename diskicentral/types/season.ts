import { CompetitionStatus } from "./common";

export type Season = {
  id: string;
  name: string;
  slug: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  competitionIds: string[];
};

export type AddSeason = {
  name: string;
  slug: string;
  status: CompetitionStatus;
};

export type UpdateSeason = {
  name: string | null;
  slug: string | null;
  status: CompetitionStatus | null;
};

export type GetAllSeasonsResponse = {
  success: boolean;
  message: string;
  data: Season[];
  errors: string[];
};

export type GetSeasonResponse = {
  success: boolean;
  message: string;
  data: Season;
  errors: string[];
};
