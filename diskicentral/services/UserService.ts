import {
  AddUser,
  GetAllUsersResponse,
  GetUserResponse,
  UpdateUser,
} from "@/types/user";
import { apiRequest, BASE_URL } from "@/services/ApiRequest";
import { BooleanResponse } from "@/types/common";

export class UsersService {
  public async getApiUsers(): Promise<GetAllUsersResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Users` },
      "Failed to fetch users.",
    );
  }

  public async addUser(user: AddUser): Promise<GetUserResponse> {
    return apiRequest(
      {
        method: "POST",
        url: `${BASE_URL}/api/Users`,
        headers: { "Content-Type": "application/json" },
        data: user,
      },
      "Failed to add user.",
    );
  }

  public async getUserById(id: string): Promise<GetUserResponse> {
    return apiRequest(
      { method: "GET", url: `${BASE_URL}/api/Users/${encodeURIComponent(id)}` },
      "Failed to fetch user.",
    );
  }

  public async updateUser(
    id: string,
    user: UpdateUser,
  ): Promise<GetUserResponse> {
    return apiRequest(
      {
        method: "PUT",
        url: `${BASE_URL}/api/Users/${encodeURIComponent(id)}`,
        headers: { "Content-Type": "application/json" },
        data: user,
      },
      "Failed to update user.",
    );
  }

  public async deleteUser(id: string): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "DELETE",
        url: `${BASE_URL}/api/Users/${encodeURIComponent(id)}`,
      },
      "Failed to delete user.",
    );
  }

  public async activateUser(id: string): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "PUT",
        url: `${BASE_URL}/api/Users/${encodeURIComponent(id)}/activate`,
      },
      "Failed to activate user.",
    );
  }

  public async deactivateUser(id: string): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "PUT",
        url: `${BASE_URL}/api/Users/${encodeURIComponent(id)}/deactivate`,
      },
      "Failed to deactivate user.",
    );
  }

  public async updateUserRole(id: string): Promise<BooleanResponse> {
    return apiRequest(
      {
        method: "PUT",
        url: `${BASE_URL}/api/Users/${encodeURIComponent(id)}/role`,
      },
      "Failed to update user role.",
    );
  }
}
