export type AuthResponse = {
  userId: string;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
  expiresIn: number;
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

export type AuthResponseEnvelope = {
  success: boolean;
  message: string;
  data: AuthResponse;
  errors: string[];
};
