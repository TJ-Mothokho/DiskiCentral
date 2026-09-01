export type PlayerTeamHistory = {
  id: string;
  playerId: string;
  teamId: string;
  startYear: number;
  endYear: number | null;
  createdAt: string;
  updatedAt: string;
  playerName: string | null;
  teamName: string | null;
};

export type AddPlayerTeamHistory = {
  playerId: string;
  teamId: string;
  startYear: number;
  endYear: number | null;
};

export type UpdatePlayerTeamHistory = {
  playerId: string | null;
  teamId: string | null;
  startYear: number | null;
  endYear: number | null;
};

export type GetAllPlayerTeamHistoriesResponse = {
  success: boolean;
  message: string;
  data: PlayerTeamHistory[];
  errors: string[];
};

export type GetPlayerTeamHistoryResponse = {
  success: boolean;
  message: string;
  data: PlayerTeamHistory;
  errors: string[];
};
