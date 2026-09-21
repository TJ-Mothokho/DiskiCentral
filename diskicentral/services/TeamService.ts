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
    formData.append("Name", team.name);
    formData.append("Slug", team.slug);
    if (team.apiId !== null) formData.append("ApiId", String(team.apiId));
    if (team.shortName) formData.append("ShortName", team.shortName);
    if (team.abbreviation) formData.append("Abbreviation", team.abbreviation);
    if (team.logo) formData.append("Logo", team.logo);
    if (team.colour) formData.append("Colour", team.colour);
    if (team.coach) formData.append("Coach", team.coach);
    if (team.stadium) formData.append("Stadium", team.stadium);
    if (team.city) formData.append("City", team.city);
    if (team.country) formData.append("Country", team.country);
    formData.append("Founded", String(team.founded));
    if (team.description) formData.append("Description", team.description);
    team.competitionIds.forEach((id) => formData.append("CompetitionIds", id));

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
    if (team.name) formData.append("Name", team.name);
    if (team.slug) formData.append("Slug", team.slug);
    if (team.apiId !== null && team.apiId !== undefined)
      formData.append("ApiId", String(team.apiId));
    if (team.shortName) formData.append("ShortName", team.shortName);
    if (team.abbreviation) formData.append("Abbreviation", team.abbreviation);
    if (team.logo) formData.append("Logo", team.logo);
    if (team.colour) formData.append("Colour", team.colour);
    if (team.coach) formData.append("Coach", team.coach);
    if (team.stadium) formData.append("Stadium", team.stadium);
    if (team.city) formData.append("City", team.city);
    if (team.country) formData.append("Country", team.country);
    if (team.founded) formData.append("Founded", String(team.founded));
    if (team.description) formData.append("Description", team.description);
    team.competitionIds.forEach((id) => formData.append("CompetitionIds", id));
    return apiRequest(
      {
        method: "PUT",
        url: `${BASE_URL}/api/Teams/${encodeURIComponent(id)}`,
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
