import {
  AddVideo,
  GetAllVideosResponse,
  GetVideoResponse,
  UpdateVideo,
} from "@/types/video";
import { BooleanResponse } from "@/types/common";
import { apiRequest, BASE_URL } from "@/services/ApiRequest";

export class VideoService {
  public static async getApiVideos(): Promise<GetAllVideosResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Videos` },
      "Failed to fetch videos.",
    );
  }

  public static async addVideo(video: AddVideo): Promise<GetVideoResponse> {
    return apiRequest(
      {
        method: "POST",
        url: `${BASE_URL}/api/Videos`,
        headers: { "Content-Type": "application/json" },
        data: video,
      },
      "Failed to add video.",
    );
  }

  public static async getVideoById(id: string): Promise<GetVideoResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Videos/${encodeURIComponent(id)}`,
      },
      "Failed to fetch video.",
    );
  }

  public static async updateVideo(
    id: string,
    video: UpdateVideo,
  ): Promise<GetVideoResponse> {
    return apiRequest(
      {
        method: "PUT",
        url: `${BASE_URL}/api/Videos/${encodeURIComponent(id)}`,
        headers: { "Content-Type": "application/json" },
        data: video,
      },
      "Failed to update video.",
    );
  }

  public static async deleteVideo(id: string): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "DELETE",
        url: `${BASE_URL}/api/Videos/${encodeURIComponent(id)}`,
      },
      "Failed to delete video.",
    );
  }

  public static async getVideosByAuthorId(
    authorId: string,
  ): Promise<GetAllVideosResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Videos/author/${encodeURIComponent(authorId)}`,
      },
      "Failed to fetch videos by author.",
    );
  }

  public static async getVideosByCategoryId(
    categoryId: string,
  ): Promise<GetAllVideosResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Videos/category/${encodeURIComponent(categoryId)}`,
      },
      "Failed to fetch videos by category.",
    );
  }

  public static async getFeaturedApiVideos(): Promise<GetAllVideosResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Videos/featured` },
      "Failed to fetch featured videos.",
    );
  }

  public static async getVideoBySlug(slug: string): Promise<GetVideoResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Videos/slug/${encodeURIComponent(slug)}`,
      },
      "Failed to fetch video by slug.",
    );
  }
}
