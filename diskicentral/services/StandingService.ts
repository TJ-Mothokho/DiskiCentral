import {
  AddStanding,
  GetAllStandingsResponse,
  GetStandingResponse,
  UpdateStanding,
} from "@/types/standing";
import { apiRequest, BASE_URL } from "@/services/ApiRequest";
import { BooleanResponse } from "@/types/common";

export class StandingsService {
  public async getApiStandings(): Promise<GetAllStandingsResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Standings` },
      "Failed to fetch standings.",
    );
  }

  public async addStanding(
    standing: AddStanding,
  ): Promise<GetStandingResponse> {
    return apiRequest(
      {
        method: "POST",
        url: `${BASE_URL}/api/Standings`,
        headers: { "Content-Type": "application/json" },
        data: standing,
      },
      "Failed to add standing.",
    );
  }

  public async getStandingById(id: string): Promise<GetStandingResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Standings/${encodeURIComponent(id)}`,
      },
      "Failed to fetch standing.",
    );
  }

  public async updateStanding(
    id: string,
    standing: UpdateStanding,
  ): Promise<GetStandingResponse> {
    return apiRequest(
      {
        method: "PUT",
        url: `${BASE_URL}/api/Standings/${encodeURIComponent(id)}`,
        headers: { "Content-Type": "application/json" },
        data: standing,
      },
      "Failed to update standing.",
    );
  }

  public async deleteStanding(id: string): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "DELETE",
        url: `${BASE_URL}/api/Standings/${encodeURIComponent(id)}`,
      },
      "Failed to delete standing.",
    );
  }

  public async getStandingsByCompetitionId(
    competitionId: string,
  ): Promise<GetAllStandingsResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Standings/competition/${encodeURIComponent(competitionId)}`,
      },
      "Failed to fetch standings by competition.",
    );
  }
}
