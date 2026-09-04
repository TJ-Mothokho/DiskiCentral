"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthService } from "@/services/AuthService";
import { TokenStorage } from "@/services/TokenStorage";
import type { AuthResponse, Login, Register } from "@/types/auth";
import type { User } from "@/types/user";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: Login) => Promise<void>;
  register: (data: Register) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<User>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  refreshUser: async () => {
    throw new Error("Authentication provider is unavailable.");
  },
});

const authService = new AuthService();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = useCallback(() => {
    TokenStorage.clear();
    setUser(null);
  }, []);

  // Restore whatever was persisted from a previous session on first load.
  useEffect(() => {
    const restore = async () => {
      const persisted = TokenStorage.getPersistedAuth();
      if (!persisted || TokenStorage.isExpired()) {
        if (persisted) TokenStorage.clear();
        setIsLoading(false);
        return;
      }

      try {
        const response = await authService.getCurrentUser();
        if (!response.data) throw new Error("No authenticated user returned.");
        TokenStorage.setUser(response.data);
        setUser(response.data);
      } catch {
        clearSession();
      } finally {
        setIsLoading(false);
      }
    };

    void restore();
  }, [clearSession]);

  // Any request that comes back 401 clears the token; keep this state in sync.
  useEffect(() => {
    const handleUnauthorized = () => setUser(null);
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

  // Login already returns the authenticated user identity. Store that response
  // without making a second protected request during the login transaction.
  const persistSession = useCallback((auth: AuthResponse) => {
    const authenticatedUser: User = {
      id: auth.userId,
      name: auth.name,
      email: auth.email,
      role: auth.role ?? TokenStorage.getRoleFromToken() ?? 3,
      active: auth.active ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    TokenStorage.setAuth({
      token: auth.token,
      refreshToken: auth.refreshToken,
      expiresIn: auth.expiresIn,
      user: authenticatedUser,
    });
    setUser(authenticatedUser);
  }, []);

  const refreshUser = useCallback(async () => {
    const response = await authService.getCurrentUser();
    if (!response.data) throw new Error("Unable to fetch the current user.");
    TokenStorage.setUser(response.data);
    setUser(response.data);
    return response.data;
  }, []);

  const login = useCallback(
    async (credentials: Login) => {
      const response = await authService.login(credentials);
      await persistSession(response);
    },
    [persistSession],
  );

  const register = useCallback(
    async (data: Register) => {
      const response = await authService.register(data);

      if (response.data && !response.data.requiresEmailConfirmation) {
        await persistSession(response.data);
      }
    },
    [persistSession],
  );

  const logout = useCallback(async () => {
    try {
      if (TokenStorage.getToken()) {
        await authService.logout();
      }
    } catch {
      // Local logout must still succeed when the token is expired or revoked.
    } finally {
      clearSession();
    }
  }, [clearSession]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, isLoading, login, register, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
