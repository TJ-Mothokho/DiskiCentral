import {
  AddAuthor,
  GetAllAuthorsResponse,
  GetAuthorResponse,
  UpdateAuthor,
} from "@/types/author";
import { apiRequest, BASE_URL } from "@/services/ApiRequest";
import { BooleanResponse } from "@/types/common";

export class AuthorsService {
  public async getApiAuthors(): Promise<GetAllAuthorsResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Authors` },
      "Failed to fetch authors.",
    );
  }

  public async addAuthor(author: AddAuthor): Promise<GetAuthorResponse> {
    return apiRequest(
      {
        method: "POST",
        url: `${BASE_URL}/api/Authors`,
        headers: { "Content-Type": "application/json" },
        data: author,
      },
      "Failed to add author.",
    );
  }

  public async getAuthorById(id: string): Promise<GetAuthorResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Authors/${encodeURIComponent(id)}`,
      },
      "Failed to fetch author.",
    );
  }

  public async updateAuthor(
    id: string,
    author: UpdateAuthor,
  ): Promise<GetAuthorResponse> {
    return apiRequest(
      {
        method: "PUT",
        url: `${BASE_URL}/api/Authors/${encodeURIComponent(id)}`,
        headers: { "Content-Type": "application/json" },
        data: author,
      },
      "Failed to update author.",
    );
  }

  public async deleteAuthor(id: string): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "DELETE",
        url: `${BASE_URL}/api/Authors/${encodeURIComponent(id)}`,
      },
      "Failed to delete author.",
    );
  }

  public async getAuthorBySlug(slug: string): Promise<GetAuthorResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Authors/slug/${encodeURIComponent(slug)}`,
      },
      "Failed to fetch author by slug.",
    );
  }

  public async getAuthorByUserId(userId: string): Promise<GetAuthorResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Authors/user/${encodeURIComponent(userId)}`,
      },
      "Failed to fetch author by user.",
    );
  }
}
