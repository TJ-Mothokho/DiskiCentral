import {
  AddPlayer,
  GetAllPlayersResponse,
  GetPlayerResponse,
  UpdatePlayer,
} from "@/types/player";
import { BooleanResponse } from "@/types/common";
import { apiRequest, BASE_URL } from "@/services/ApiRequest";

export class PlayersService {
  public static async getApiPlayers(): Promise<GetAllPlayersResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Players` },
      "Failed to fetch players.",
    );
  }

  public static async addPlayer(player: AddPlayer): Promise<GetPlayerResponse> {
    return apiRequest(
      {
        method: "POST",
        url: `${BASE_URL}/api/Players`,
        headers: { "Content-Type": "application/json" },
        data: player,
      },
      "Failed to add player.",
    );
  }

  public static async getPlayerById(id: string): Promise<GetPlayerResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Players/${encodeURIComponent(id)}`,
      },
      "Failed to fetch player.",
    );
  }

  public static async updatePlayer(
    id: string,
    player: UpdatePlayer,
  ): Promise<GetPlayerResponse> {
    return apiRequest(
      {
        method: "PUT",
        url: `${BASE_URL}/api/Players/${encodeURIComponent(id)}`,
        headers: { "Content-Type": "application/json" },
        data: player,
      },
      "Failed to update player.",
    );
  }

  public static async deletePlayer(id: string): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "DELETE",
        url: `${BASE_URL}/api/Players/${encodeURIComponent(id)}`,
      },
      "Failed to delete player.",
    );
  }

  public static async searchPlayers(
    query?: string,
  ): Promise<GetAllPlayersResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Players/search`,
        params: query ? { query } : undefined,
      },
      "Failed to search players.",
    );
  }

  public static async getPlayerBySlug(
    slug: string,
  ): Promise<GetPlayerResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Players/slug/${encodeURIComponent(slug)}`,
      },
      "Failed to fetch player by slug.",
    );
  }

  public static async getPlayersByTeamId(
    teamId: string,
  ): Promise<GetAllPlayersResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Players/team/${encodeURIComponent(teamId)}`,
      },
      "Failed to fetch players by team.",
    );
  }
}
