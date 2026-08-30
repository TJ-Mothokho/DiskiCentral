import {
  AddFixture,
  GetAllFixturesResponse,
  GetFixtureResponse,
  UpdateFixture,
} from "@/types/fixture";
import axios from "axios";
import { BooleanResponse } from "@/types/common";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "";

export class FixturesService {
  public async getApiFixtures(): Promise<GetAllFixturesResponse> {
    try {
      const response = await axios.request<GetAllFixturesResponse>({
        method: "GET",
        url: `${BASE_URL}/api/Fixtures`,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch fixtures:", error);
      throw "Failed to fetch fixtures. Please try again.";
    }
  }

  public async addFixture(fixture: AddFixture): Promise<GetFixtureResponse> {
    try {
      const response = await axios.request<GetFixtureResponse>({
        method: "POST",
        url: `${BASE_URL}/api/Fixtures`,
        headers: { "Content-Type": "application/json" },
        data: fixture,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to add fixture:", error);
      throw "Failed to add fixture. Please try again.";
    }
  }

  public async getFixtureById(id: string): Promise<GetFixtureResponse> {
    try {
      const response = await axios.request<GetFixtureResponse>({
        method: "GET",
        url: `${BASE_URL}/api/Fixtures/${encodeURIComponent(id)}`,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch fixture:", error);
      throw "Failed to fetch fixture. Please try again.";
    }
  }

  public async updateFixture(
    id: string,
    fixture: UpdateFixture,
  ): Promise<GetFixtureResponse> {
    try {
      const response = await axios.request<GetFixtureResponse>({
        method: "PUT",
        url: `${BASE_URL}/api/Fixtures/${encodeURIComponent(id)}`,
        headers: { "Content-Type": "application/json" },
        data: fixture,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to update fixture:", error);
      throw "Failed to update fixture. Please try again.";
    }
  }

  public async deleteFixture(id: string): Promise<BooleanResponse> {
    try {
      const response = await axios.request<BooleanResponse>({
        method: "DELETE",
        url: `${BASE_URL}/api/Fixtures/${encodeURIComponent(id)}`,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to delete fixture:", error);
      throw "Failed to delete fixture. Please try again.";
    }
  }

  public async getFixturesByCompetitionId(
    competitionId: string,
  ): Promise<GetAllFixturesResponse> {
    try {
      const response = await axios.request<GetAllFixturesResponse>({
        method: "GET",
        url: `${BASE_URL}/api/Fixtures/competition/${encodeURIComponent(competitionId)}`,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch fixtures by competition:", error);
      throw "Failed to fetch fixtures by competition. Please try again.";
    }
  }

  public async getFinishedFixtures(): Promise<GetAllFixturesResponse> {
    try {
      const response = await axios.request<GetAllFixturesResponse>({
        method: "GET",
        url: `${BASE_URL}/api/Fixtures/finished`,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch finished fixtures:", error);
      throw "Failed to fetch finished fixtures. Please try again.";
    }
  }

  public async getFixturesByTeamId(
    teamId: string,
  ): Promise<GetAllFixturesResponse> {
    try {
      const response = await axios.request<GetAllFixturesResponse>({
        method: "GET",
        url: `${BASE_URL}/api/Fixtures/team/${encodeURIComponent(teamId)}`,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch fixtures by team:", error);
      throw "Failed to fetch fixtures by team. Please try again.";
    }
  }

  public async getUpcomingFixtures(): Promise<GetAllFixturesResponse> {
    try {
      const response = await axios.request<GetAllFixturesResponse>({
        method: "GET",
        url: `${BASE_URL}/api/Fixtures/upcoming`,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch upcoming fixtures:", error);
      throw "Failed to fetch upcoming fixtures. Please try again.";
    }
  }
}
