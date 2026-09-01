import {
  AddCategory,
  GetAllCategoriesResponse,
  GetCategoryResponse,
  UpdateCategory,
} from "@/types/category";
import { apiRequest, BASE_URL } from "@/services/ApiRequest";
import { BooleanResponse } from "@/types/common";

export class CategoriesService {
  public async getApiCategories(): Promise<GetAllCategoriesResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Categories` },
      "Failed to fetch categories.",
    );
  }

  public async addCategory(
    category: AddCategory,
  ): Promise<GetCategoryResponse> {
    return apiRequest(
      {
        method: "POST",
        url: `${BASE_URL}/api/Categories`,
        headers: { "Content-Type": "application/json" },
        data: category,
      },
      "Failed to add category.",
    );
  }

  public async getCategoryById(id: string): Promise<GetCategoryResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Categories/${encodeURIComponent(id)}`,
      },
      "Failed to fetch category.",
    );
  }

  public async updateCategory(
    id: string,
    category: UpdateCategory,
  ): Promise<GetCategoryResponse> {
    return apiRequest(
      {
        method: "PUT",
        url: `${BASE_URL}/api/Categories/${encodeURIComponent(id)}`,
        headers: { "Content-Type": "application/json" },
        data: category,
      },
      "Failed to update category.",
    );
  }

  public async deleteCategory(id: string): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "DELETE",
        url: `${BASE_URL}/api/Categories/${encodeURIComponent(id)}`,
      },
      "Failed to delete category.",
    );
  }

  public async getCategoryBySlug(slug: string): Promise<GetCategoryResponse> {
    return apiRequest(
      {
        method: "GET",
        url: `${BASE_URL}/api/Categories/slug/${encodeURIComponent(slug)}`,
      },
      "Failed to fetch category by slug.",
    );
  }
}
