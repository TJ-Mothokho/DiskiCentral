import {
  AddTeam,
  GetAllTeamsResponse,
  GetTeamResponse,
  UpdateTeam,
} from "@/types/team";
import { BooleanResponse } from "@/types/common";
import { apiRequest, BASE_URL } from "@/services/ApiRequest";

export class TeamsService {
  public async getApiTeams(): Promise<GetAllTeamsResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Teams` },
      "Failed to fetch teams.",
    );
  }

  public async addTeam(team: AddTeam): Promise<GetTeamResponse> {
    return apiRequest(
      {
        method: "POST",
        url: `${BASE_URL}/api/Teams`,
        headers: { "Content-Type": "application/json" },
        data: team,
      },
      "Failed to add team.",
    );
  }

  public async getTeamById(id: string): Promise<GetTeamResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Teams/${encodeURIComponent(id)}` },
      "Failed to fetch team.",
    );
  }

  public async updateTeam(
    id: string,
    team: UpdateTeam,
  ): Promise<GetTeamResponse> {
    return apiRequest(
      {
        method: "PUT",
        url: `${BASE_URL}/api/Teams/${encodeURIComponent(id)}`,
        headers: { "Content-Type": "application/json" },
        data: team,
      },
      "Failed to update team.",
    );
  }

  public async deleteTeam(id: string): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "DELETE",
        url: `${BASE_URL}/api/Teams/${encodeURIComponent(id)}`,
      },
      "Failed to delete team.",
    );
  }

  public async getTeamsByCompetitionId(
    competitionId: string,
  ): Promise<GetAllTeamsResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Teams/competition/${encodeURIComponent(competitionId)}`,
      },
      "Failed to fetch teams by competition.",
    );
  }

  public async getTeamBySlug(slug: string): Promise<GetTeamResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Teams/slug/${encodeURIComponent(slug)}`,
      },
      "Failed to fetch team by slug.",
    );
  }
}
