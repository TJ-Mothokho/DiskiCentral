import {
  AddPlayer,
  GetAllPlayersResponse,
  GetPlayerResponse,
  UpdatePlayer,
} from "@/types/player";
import axios from "axios";
import { BooleanResponse } from "@/types/common";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "";

export class PlayersService {
  public static async getApiPlayers(): Promise<GetAllPlayersResponse> {
    try {
      const response = await axios.request<GetAllPlayersResponse>({
        method: "GET",
        url: `${BASE_URL}/api/Players`,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch players:", error);
      throw "Failed to fetch players. Please try again.";
    }
  }

  public static async addPlayer(player: AddPlayer): Promise<GetPlayerResponse> {
    try {
      const response = await axios.request<GetPlayerResponse>({
        method: "POST",
        url: `${BASE_URL}/api/Players`,
        headers: { "Content-Type": "application/json" },
        data: player,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to add player:", error);
      throw "Failed to add player. Please try again.";
    }
  }

  public static async getPlayerById(id: string): Promise<GetPlayerResponse> {
    try {
      const response = await axios.request<GetPlayerResponse>({
        method: "GET",
        url: `${BASE_URL}/api/Players/${encodeURIComponent(id)}`,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch player:", error);
      throw "Failed to fetch player. Please try again.";
    }
  }

  public static async updatePlayer(
    id: string,
    player: UpdatePlayer,
  ): Promise<GetPlayerResponse> {
    try {
      const response = await axios.request<GetPlayerResponse>({
        method: "PUT",
        url: `${BASE_URL}/api/Players/${encodeURIComponent(id)}`,
        headers: { "Content-Type": "application/json" },
        data: player,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to update player:", error);
      throw "Failed to update player. Please try again.";
    }
  }

  public static async deletePlayer(id: string): Promise<BooleanResponse> {
    try {
      const response = await axios.request<BooleanResponse>({
        method: "DELETE",
        url: `${BASE_URL}/api/Players/${encodeURIComponent(id)}`,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to delete player:", error);
      throw "Failed to delete player. Please try again.";
    }
  }

  public static async searchPlayers(query?: string): Promise<GetAllPlayersResponse> {
    try {
      const response = await axios.request<GetAllPlayersResponse>({
        method: "GET",
        url: `${BASE_URL}/api/Players/search`,
        params: query ? { query } : undefined,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to search players:", error);
      throw "Failed to search players. Please try again.";
    }
  }

  public static async getPlayerBySlug(slug: string): Promise<GetPlayerResponse> {
    try {
      const response = await axios.request<GetPlayerResponse>({
        method: "GET",
        url: `${BASE_URL}/api/Players/slug/${encodeURIComponent(slug)}`,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch player by slug:", error);
      throw "Failed to fetch player by slug. Please try again.";
    }
  }

  public static async getPlayersByTeamId(
    teamId: string,
  ): Promise<GetAllPlayersResponse> {
    try {
      const response = await axios.request<GetAllPlayersResponse>({
        method: "GET",
        url: `${BASE_URL}/api/Players/team/${encodeURIComponent(teamId)}`,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch players by team:", error);
      throw "Failed to fetch players by team. Please try again.";
    }
  }
}
