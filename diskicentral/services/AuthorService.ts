import {
  AddAuthor,
  GetAllAuthorsResponse,
  GetAuthorResponse,
  UpdateAuthor,
} from "@/types/author";
import { apiRequest, BASE_URL } from "@/services/ApiRequest";
import { BooleanResponse } from "@/types/common";

function authorFormData(author: AddAuthor | UpdateAuthor) {
  const formData = new FormData();
  const append = (key: string, value: unknown) => {
    if (value !== null && value !== undefined && value !== "") {
      formData.append(key, String(value));
    }
  };

  if ("userId" in author) append("userId", author.userId);
  append("name", author.name);
  append("slug", author.slug);
  append("bio", author.bio);
  append("twitter", author.twitter);
  if (author.avatar) formData.append("avatar", author.avatar);
  return formData;
}

export class AuthorsService {
  public async getApiAuthors(): Promise<GetAllAuthorsResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Authors` },
      "Failed to fetch authors.",
    );
  }

  public async addAuthor(author: AddAuthor): Promise<GetAuthorResponse> {
    return apiRequest(
      { method: "POST", url: `${BASE_URL}/api/Authors`, data: authorFormData(author) },
      "Failed to add author.",
    );
  }

  public async getAuthorById(id: string): Promise<GetAuthorResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Authors/${encodeURIComponent(id)}` },
      "Failed to fetch author.",
    );
  }

  public async updateAuthor(id: string, author: UpdateAuthor): Promise<GetAuthorResponse> {
    return apiRequest(
      { method: "PUT", url: `${BASE_URL}/api/Authors/${encodeURIComponent(id)}`, data: authorFormData(author) },
      "Failed to update author.",
    );
  }

  public async deleteAuthor(id: string): Promise<BooleanResponse> {
    return apiRequest(
      { method: "DELETE", url: `${BASE_URL}/api/Authors/${encodeURIComponent(id)}` },
      "Failed to delete author.",
    );
  }

  public async getAuthorBySlug(slug: string): Promise<GetAuthorResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Authors/slug/${encodeURIComponent(slug)}` },
      "Failed to fetch author by slug.",
    );
  }

  public async getAuthorByUserId(userId: string): Promise<GetAuthorResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Authors/user/${encodeURIComponent(userId)}` },
      "Failed to fetch author by user.",
    );
  }
}
