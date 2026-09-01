export type Standing = {
  id: string;
  competitionId: string;
  teamId: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  position: number;
  createdAt: string;
  updatedAt: string;
  teamName: string | null;
  competitionName: string | null;
};

export type AddStanding = {
  competitionId: string;
  teamId: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  position: number;
};

export type UpdateStanding = {
  played: number | null;
  wins: number | null;
  draws: number | null;
  losses: number | null;
  goalsFor: number | null;
  goalsAgainst: number | null;
  goalDifference: number | null;
  points: number | null;
  position: number | null;
};

export type GetAllStandingsResponse = {
  success: boolean;
  message: string;
  data: Standing[];
  errors: string[];
};

export type GetStandingResponse = {
  success: boolean;
  message: string;
  data: Standing;
  errors: string[];
};
