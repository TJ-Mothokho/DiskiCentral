import {
  AddPlayerTeamHistory,
  GetAllPlayerTeamHistoriesResponse,
  GetPlayerTeamHistoryResponse,
  UpdatePlayerTeamHistory,
} from "@/types/player-team-history";
import { apiRequest, BASE_URL } from "@/services/ApiRequest";
import { BooleanResponse } from "@/types/common";

export class PlayerTeamHistoriesService {
  public async getApiPlayerTeamHistories(): Promise<GetAllPlayerTeamHistoriesResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/PlayerTeamHistories` },
      "Failed to fetch player team histories.",
    );
  }

  public async addPlayerTeamHistory(
    history: AddPlayerTeamHistory,
  ): Promise<GetPlayerTeamHistoryResponse> {
    return apiRequest(
      {
        method: "POST",
        url: `${BASE_URL}/api/PlayerTeamHistories`,
        headers: { "Content-Type": "application/json" },
        data: history,
      },
      "Failed to add player team history.",
    );
  }

  public async getPlayerTeamHistoryById(
    id: string,
  ): Promise<GetPlayerTeamHistoryResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/PlayerTeamHistories/${encodeURIComponent(id)}`,
      },
      "Failed to fetch player team history.",
    );
  }

  public async updatePlayerTeamHistory(
    id: string,
    history: UpdatePlayerTeamHistory,
  ): Promise<GetPlayerTeamHistoryResponse> {
    return apiRequest(
      {
        method: "PUT",
        url: `${BASE_URL}/api/PlayerTeamHistories/${encodeURIComponent(id)}`,
        headers: { "Content-Type": "application/json" },
        data: history,
      },
      "Failed to update player team history.",
    );
  }

  public async deletePlayerTeamHistory(id: string): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "DELETE",
        url: `${BASE_URL}/api/PlayerTeamHistories/${encodeURIComponent(id)}`,
      },
      "Failed to delete player team history.",
    );
  }

  public async getPlayerTeamHistoriesByPlayerId(
    playerId: string,
  ): Promise<GetAllPlayerTeamHistoriesResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/PlayerTeamHistories/player/${encodeURIComponent(playerId)}`,
      },
      "Failed to fetch player team histories by player.",
    );
  }

  public async getPlayerTeamHistoriesByTeamId(
    teamId: string,
  ): Promise<GetAllPlayerTeamHistoriesResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/PlayerTeamHistories/team/${encodeURIComponent(teamId)}`,
      },
      "Failed to fetch player team histories by team.",
    );
  }
}
