import {
  AddVideo,
  GetAllVideosResponse,
  GetVideoResponse,
  UpdateVideo,
} from "@/types/video";
import axios from "axios";
import { BooleanResponse } from "@/types/common";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "";

export class VideoService {
  public static async getApiVideos(): Promise<GetAllVideosResponse> {
    try {
      const response = await axios.request<GetAllVideosResponse>({
        method: "GET",
        url: `${BASE_URL}/api/Videos`,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch videos:", error);
      throw "Failed to fetch videos. Please try again.";
    }
  }

  public static async addVideo(video: AddVideo): Promise<GetVideoResponse> {
    try {
      const response = await axios.request<GetVideoResponse>({
        method: "POST",
        url: `${BASE_URL}/api/Videos`,
        headers: { "Content-Type": "application/json" },
        data: video,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to add video:", error);
      throw "Failed to add video. Please try again.";
    }
  }

  public static async getVideoById(id: string): Promise<GetVideoResponse> {
    try {
      const response = await axios.request<GetVideoResponse>({
        method: "GET",
        url: `${BASE_URL}/api/Videos/${encodeURIComponent(id)}`,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch video:", error);
      throw "Failed to fetch video. Please try again.";
    }
  }

  public static async updateVideo(
    id: string,
    video: UpdateVideo,
  ): Promise<GetVideoResponse> {
    try {
      const response = await axios.request<GetVideoResponse>({
        method: "PUT",
        url: `${BASE_URL}/api/Videos/${encodeURIComponent(id)}`,
        headers: { "Content-Type": "application/json" },
        data: video,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to update video:", error);
      throw "Failed to update video. Please try again.";
    }
  }

  public static async deleteVideo(id: string): Promise<BooleanResponse> {
    try {
      const response = await axios.request<BooleanResponse>({
        method: "DELETE",
        url: `${BASE_URL}/api/Videos/${encodeURIComponent(id)}`,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to delete video:", error);
      throw "Failed to delete video. Please try again.";
    }
  }

  public static async getVideosByAuthorId(
    authorId: string,
  ): Promise<GetAllVideosResponse> {
    try {
      const response = await axios.request<GetAllVideosResponse>({
        method: "GET",
        url: `${BASE_URL}/api/Videos/author/${encodeURIComponent(authorId)}`,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch videos by author:", error);
      throw "Failed to fetch videos by author. Please try again.";
    }
  }

  public static async getVideosByCategoryId(
    categoryId: string,
  ): Promise<GetAllVideosResponse> {
    try {
      const response = await axios.request<GetAllVideosResponse>({
        method: "GET",
        url: `${BASE_URL}/api/Videos/category/${encodeURIComponent(categoryId)}`,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch videos by category:", error);
      throw "Failed to fetch videos by category. Please try again.";
    }
  }

  public static async getFeaturedApiVideos(): Promise<GetAllVideosResponse> {
    try {
      const response = await axios.request<GetAllVideosResponse>({
        method: "GET",
        url: `${BASE_URL}/api/Videos/featured`,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch featured videos:", error);
      throw "Failed to fetch featured videos. Please try again.";
    }
  }

  public static async getVideoBySlug(slug: string): Promise<GetVideoResponse> {
    try {
      const response = await axios.request<GetVideoResponse>({
        method: "GET",
        url: `${BASE_URL}/api/Videos/slug/${encodeURIComponent(slug)}`,
      });

      if (!response.data.success) {
        throw (
          response.data.errors ??
          "Unexpected error occurred. Please refresh the page!"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to fetch video by slug:", error);
      throw "Failed to fetch video by slug. Please try again.";
    }
  }
}
