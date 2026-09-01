import {
  AddTag,
  GetAllTagsResponse,
  GetTagResponse,
  UpdateTag,
} from "@/types/tag";
import { apiRequest, BASE_URL } from "@/services/ApiRequest";
import { BooleanResponse } from "@/types/common";

export class TagsService {
  public async getApiTags(): Promise<GetAllTagsResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Tags` },
      "Failed to fetch tags.",
    );
  }

  public async addTag(tag: AddTag): Promise<GetTagResponse> {
    return apiRequest(
      {
        method: "POST",
        url: `${BASE_URL}/api/Tags`,
        headers: { "Content-Type": "application/json" },
        data: tag,
      },
      "Failed to add tag.",
    );
  }

  public async getTagById(id: string): Promise<GetTagResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Tags/${encodeURIComponent(id)}` },
      "Failed to fetch tag.",
    );
  }

  public async updateTag(id: string, tag: UpdateTag): Promise<GetTagResponse> {
    return apiRequest(
      {
        method: "PUT",
        url: `${BASE_URL}/api/Tags/${encodeURIComponent(id)}`,
        headers: { "Content-Type": "application/json" },
        data: tag,
      },
      "Failed to update tag.",
    );
  }

  public async deleteTag(id: string): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "DELETE",
        url: `${BASE_URL}/api/Tags/${encodeURIComponent(id)}`,
      },
      "Failed to delete tag.",
    );
  }

  public async getTagBySlug(slug: string): Promise<GetTagResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Tags/slug/${encodeURIComponent(slug)}`,
      },
      "Failed to fetch tag by slug.",
    );
  }
}
