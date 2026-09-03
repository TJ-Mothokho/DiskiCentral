import { AxiosRequestConfig } from "axios";
import {
  AuthResponse,
  AuthResponseEnvelope,
  ChangePassword,
  ConfirmEmail,
  ExternalAuth,
  ForgotPassword,
  Login,
  PasswordReset,
  RefreshToken,
  Register,
  ResendConfirmation,
  ResetPassword,
} from "@/types/auth";
import { BooleanResponse } from "@/types/common";
import { GetUserResponse } from "@/types/user";
import { apiClient, BASE_URL } from "@/services/ApiRequest";

type PasswordResetResponse = {
  success: boolean;
  message: string;
  data: PasswordReset | null;
  errors: string[];
};

export class AuthService {
  private async request<T>(
    options: AxiosRequestConfig,
    errorMessage: string,
  ): Promise<T> {
    try {
      const response = await apiClient.request<T>(options);

      const responseData = response.data as T & {
        success: boolean;
        errors?: string[];
      };

      if (!responseData.success) {
        throw responseData.errors?.length
          ? responseData.errors
          : "Unexpected error occurred. Please refresh the page!";
      }

      return response.data;
    } catch (error) {
      console.error(errorMessage, error);
      throw `${errorMessage} Please try again.`;
    }
  }

  public async register(registerData: Register): Promise<AuthResponseEnvelope> {
    return this.request<AuthResponseEnvelope>(
      {
        method: "POST",
        url: `${BASE_URL}/api/Auth/register`,
        headers: {
          "Content-Type": "application/json",
        },
        data: registerData,
      },
      "Failed to register user.",
    );
  }

  public async login(loginData: Login): Promise<AuthResponse> {
    return this.request<AuthResponse>(
      {
        method: "POST",
        url: `${BASE_URL}/api/Auth/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: loginData,
      },
      "Failed to log in.",
    );
  }

  public async refreshToken(
    refreshTokenData: RefreshToken,
  ): Promise<AuthResponse> {
    return this.request<AuthResponse>(
      {
        method: "POST",
        url: `${BASE_URL}/api/Auth/refresh`,
        headers: {
          "Content-Type": "application/json",
        },
        data: refreshTokenData,
      },
      "Failed to refresh authentication token.",
    );
  }

  public async externalLogin(
    externalAuthData: ExternalAuth,
  ): Promise<AuthResponse> {
    return this.request<AuthResponse>(
      {
        method: "POST",
        url: `${BASE_URL}/api/Auth/external`,
        headers: {
          "Content-Type": "application/json",
        },
        data: externalAuthData,
      },
      "Failed to authenticate externally.",
    );
  }

  public async forgotPassword(
    forgotPasswordData: ForgotPassword,
  ): Promise<PasswordResetResponse> {
    return this.request<PasswordResetResponse>(
      {
        method: "POST",
        url: `${BASE_URL}/api/Auth/forgot-password`,
        headers: {
          "Content-Type": "application/json",
        },
        data: forgotPasswordData,
      },
      "Failed to request password reset.",
    );
  }

  public async confirmEmail(
    confirmEmailData: ConfirmEmail,
  ): Promise<BooleanResponse> {
    return this.request<BooleanResponse>(
      {
        method: "POST",
        url: `${BASE_URL}/api/Auth/confirm-email`,
        headers: {
          "Content-Type": "application/json",
        },
        data: confirmEmailData,
      },
      "Failed to confirm email.",
    );
  }

  public async resendConfirmation(
    resendConfirmationData: ResendConfirmation,
  ): Promise<BooleanResponse> {
    return this.request<BooleanResponse>(
      {
        method: "POST",
        url: `${BASE_URL}/api/Auth/resend-confirmation`,
        headers: {
          "Content-Type": "application/json",
        },
        data: resendConfirmationData,
      },
      "Failed to resend confirmation email.",
    );
  }

  public async resetPassword(
    resetPasswordData: ResetPassword,
  ): Promise<BooleanResponse> {
    return this.request<BooleanResponse>(
      {
        method: "POST",
        url: `${BASE_URL}/api/Auth/reset-password`,
        headers: {
          "Content-Type": "application/json",
        },
        data: resetPasswordData,
      },
      "Failed to reset password.",
    );
  }

  public async validateToken(): Promise<BooleanResponse> {
    return this.request<BooleanResponse>(
      {
        method: "GET",
        url: `${BASE_URL}/api/Auth/validate`,
      },
      "Failed to validate authentication token.",
    );
  }

  public async getCurrentUser(): Promise<GetUserResponse> {
    return this.request<GetUserResponse>(
      {
        method: "GET",
        url: `${BASE_URL}/api/Auth/me`,
      },
      "Failed to fetch current user.",
    );
  }

  public async changePassword(
    changePasswordData: ChangePassword,
  ): Promise<BooleanResponse> {
    return this.request<BooleanResponse>(
      {
        method: "POST",
        url: `${BASE_URL}/api/Auth/change-password`,
        headers: {
          "Content-Type": "application/json",
        },
        data: changePasswordData,
      },
      "Failed to change password.",
    );
  }

  public async logout(): Promise<BooleanResponse> {
    return this.request<BooleanResponse>(
      {
        method: "POST",
        url: `${BASE_URL}/api/Auth/logout`,
      },
      "Failed to log out.",
    );
  }
}
