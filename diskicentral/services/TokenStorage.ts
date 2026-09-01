import type { User } from "@/types/user";

const TOKEN_KEY = "diski_access_token";
const REFRESH_TOKEN_KEY = "diski_refresh_token";
const EXPIRES_AT_KEY = "diski_token_expires_at";
const USER_KEY = "diski_user";

export type PersistedAuth = {
  token: string;
  refreshToken: string;
  expiresAt: number;
  user: User;
};

// Guards every call since this module is imported by code that also runs during SSR.
function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function safeGet(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage may be unavailable (private mode, quota exceeded, etc.) - fail silently.
  }
}

function safeRemove(key: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export const TokenStorage = {
  getToken(): string | null {
    return safeGet(TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    return safeGet(REFRESH_TOKEN_KEY);
  },

  getExpiresAt(): number | null {
    const raw = safeGet(EXPIRES_AT_KEY);
    return raw ? Number(raw) : null;
  },

  isExpired(): boolean {
    const expiresAt = this.getExpiresAt();
    if (!expiresAt) return true;
    return Date.now() >= expiresAt;
  },

  getUser(): User | null {
    const raw = safeGet(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  },

  getPersistedAuth(): PersistedAuth | null {
    const token = this.getToken();
    const refreshToken = this.getRefreshToken();
    const expiresAt = this.getExpiresAt();
    const user = this.getUser();

    if (!token || !refreshToken || !expiresAt || !user) return null;

    return { token, refreshToken, expiresAt, user };
  },

  setAuth(params: {
    token: string;
    refreshToken: string;
    expiresIn: number;
    user: User;
  }): void {
    const { token, refreshToken, expiresIn, user } = params;
    safeSet(TOKEN_KEY, token);
    safeSet(REFRESH_TOKEN_KEY, refreshToken);
    safeSet(EXPIRES_AT_KEY, String(Date.now() + expiresIn * 1000));
    safeSet(USER_KEY, JSON.stringify(user));
  },

  setUser(user: User): void {
    safeSet(USER_KEY, JSON.stringify(user));
  },

  clear(): void {
    safeRemove(TOKEN_KEY);
    safeRemove(REFRESH_TOKEN_KEY);
    safeRemove(EXPIRES_AT_KEY);
    safeRemove(USER_KEY);
  },
};
