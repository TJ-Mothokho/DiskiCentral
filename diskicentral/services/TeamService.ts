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
    const formData = new FormData();
    formData.append("name", team.name);
    formData.append("slug", team.slug);
    if (team.shortName) formData.append("shortName", team.shortName);
    if (team.abbreviation) formData.append("abbreviation", team.abbreviation);
    if (team.logo) formData.append("logo", team.logo);
    if (team.colour) formData.append("colour", team.colour);
    if (team.coach) formData.append("coach", team.coach);
    if (team.stadium) formData.append("stadium", team.stadium);
    if (team.city) formData.append("city", team.city);
    if (team.country) formData.append("country", team.country);
    formData.append("founded", String(team.founded));
    if (team.description) formData.append("description", team.description);
    team.competitionIds.forEach((id) => formData.append("competitionIds", id));

    return apiRequest(
      {
        method: "POST",
        url: `${BASE_URL}/api/Teams`,
        data: formData,
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
    const formData = new FormData();
    if (team.name) formData.append("name", team.name);
    if (team.slug) formData.append("slug", team.slug);
    if (team.shortName) formData.append("shortName", team.shortName);
    if (team.abbreviation) formData.append("abbreviation", team.abbreviation);
    if (team.logo) formData.append("logo", team.logo);
    if (team.colour) formData.append("colour", team.colour);
    if (team.coach) formData.append("coach", team.coach);
    if (team.stadium) formData.append("stadium", team.stadium);
    if (team.city) formData.append("city", team.city);
    if (team.country) formData.append("country", team.country);
    if (team.founded) formData.append("founded", String(team.founded));
    if (team.description) formData.append("description", team.description);
    team.competitionIds.forEach((id) => formData.append("competitionIds", id));
    return apiRequest(
      {
        method: "PUT",
        url: `${BASE_URL}/api/Teams/${encodeURIComponent(id)}`,
        // headers: { "Content-Type": "application/json" },
        data: formData,
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
