export type GetAllTransfersResponse = {
  success: boolean;
  message: string;
  data: Transfer[];
  errors: string[];
};

export type GetTransferResponse = {
  success: boolean;
  message: string;
  data: Transfer;
  errors: string[];
};

export type Transfer = {
  id: string;
  playerId: string;
  fromTeamId: string;
  toTeamId: string;
  fee: number;
  transferDate: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  playerName: string | null;
  fromTeamName: string | null;
  toTeamName: string | null;
};

export type AddTransfer = {
  playerId: string;
  fromTeamId: string;
  toTeamId: string;
  fee: number | null; // "Undisclosed" if null
  transferDate: string;
  status: TransferStatus;
};

export type UpdateTransfer = {
  fromTeamId: string | null;
  toTeamId: string | null;
  fee: number | null;
  transferDate: string | null;
  status: number | null;
};

export enum TransferStatus {
  Rumour = 0,
  Confirmed = 1,
  Completed = 2,
  Cancelled = 3,
}