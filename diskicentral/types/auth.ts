import type { User } from "./user";

export type AuthResponse = {
  userId: string;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
  expiresIn: number;
  requiresEmailConfirmation: boolean;
};

export type Register = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type Login = {
  email: string;
  password: string;
};

export type RefreshToken = {
  refreshToken: string;
};

export type ExternalAuth = {
  provider: string;
  idToken: string;
  accessToken: string | null;
};

export type ForgotPassword = {
  email: string;
};

export type ConfirmEmail = {
  token: string;
};

export type ResendConfirmation = {
  email: string;
};

export type ResetPassword = {
  email: string;
  resetToken: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type ChangePassword = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type PasswordReset = {
  email: string;
  message: string;
  expiresIn: number;
};

export type AuthResponseEnvelope = {
  success: boolean;
  message: string;
  data: AuthResponse | null;
  errors: string[];
};

export type ForgotPasswordResponse = {
  success: boolean;
  message: string;
  data: PasswordReset | null;
  errors: string[];
};

export type ConfirmEmailResponse = {
  success: boolean;
  message: string;
  data: boolean;
  errors: string[];
};

export type ResendConfirmationResponse = ConfirmEmailResponse;

export type ResetPasswordResponse = ConfirmEmailResponse;

export type ValidateTokenResponse = ConfirmEmailResponse;

export type MeResponse = {
  success: boolean;
  message: string;
  data: User | null;
  errors: string[];
};

export type ChangePasswordResponse = ConfirmEmailResponse;

export type LogoutResponse = ConfirmEmailResponse;
