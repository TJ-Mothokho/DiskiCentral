export type Team = {
  id: string;
  name: string;
  slug: string;
  shortName: string | null;
  abbreviation: string | null;
  logo: string | null;
  colour: string | null;
  coach: string | null;
  stadium: string | null;
  city: string | null;
  country: string | null;
  founded: number;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  competitionIds: string[];
  competitionNames: string[];
};

export type AddTeam = {
  competitionIds: string[];
  name: string;
  slug: string;
  shortName: string | null;
  abbreviation: string | null;
  logo: string | null;
  colour: string | null;
  coach: string | null;
  stadium: string | null;
  city: string | null;
  country: string | null;
  founded: number;
  description: string | null;
};

export type UpdateTeam = {
  name: string | null;
  slug: string | null;
  shortName: string | null;
  abbreviation: string | null;
  logo: string | null;
  colour: string | null;
  coach: string | null;
  stadium: string | null;
  city: string | null;
  country: string | null;
  founded: number | null;
  description: string | null;
};

export type GetAllTeamsResponse = {
  success: boolean;
  message: string;
  data: Team[];
  errors: string[];
};

export type GetTeamResponse = {
  success: boolean;
  message: string;
  data: Team;
  errors: string[];
};

export type BulkTeamLink = {
  teamIds: string[];
};
