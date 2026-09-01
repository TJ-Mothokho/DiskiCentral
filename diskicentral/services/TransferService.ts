import {
  AddTransfer,
  GetAllTransfersResponse,
  GetTransferResponse,
  UpdateTransfer,
} from "@/types/transfer";
import { BooleanResponse } from "@/types/common";
import { apiRequest, BASE_URL } from "@/services/ApiRequest";

export class TransfersService {
  public static async getApiTransfers(): Promise<GetAllTransfersResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Transfers` },
      "Failed to fetch transfers.",
    );
  }

  public static async addTransfer(
    transfer: AddTransfer,
  ): Promise<GetTransferResponse> {
    return apiRequest(
      {
        method: "POST",
        url: `${BASE_URL}/api/Transfers`,
        headers: { "Content-Type": "application/json" },
        data: transfer,
      },
      "Failed to add transfer.",
    );
  }

  public static async getTransferById(
    id: string,
  ): Promise<GetTransferResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Transfers/${encodeURIComponent(id)}`,
      },
      "Failed to fetch transfer.",
    );
  }

  public static async updateTransfer(
    id: string,
    transfer: UpdateTransfer,
  ): Promise<GetTransferResponse> {
    return apiRequest(
      {
        method: "PUT",
        url: `${BASE_URL}/api/Transfers/${encodeURIComponent(id)}`,
        headers: { "Content-Type": "application/json" },
        data: transfer,
      },
      "Failed to update transfer.",
    );
  }

  public static async deleteTransfer(id: string): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "DELETE",
        url: `${BASE_URL}/api/Transfers/${encodeURIComponent(id)}`,
      },
      "Failed to delete transfer.",
    );
  }

  public static async getTransfersByPlayerId(
    playerId: string,
  ): Promise<GetAllTransfersResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Transfers/player/${encodeURIComponent(playerId)}`,
      },
      "Failed to fetch transfers by player.",
    );
  }

  public static async getTransfersByTeamId(
    teamId: string,
  ): Promise<GetAllTransfersResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Transfers/team/${encodeURIComponent(teamId)}`,
      },
      "Failed to fetch transfers by team.",
    );
  }
}
