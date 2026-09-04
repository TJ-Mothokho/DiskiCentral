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

  // Persists the token first (so the authenticated /me call is authorized),
  // then fetches the full, accurate user record rather than trusting the
  // partial fields on the auth response.
  const persistSession = useCallback(
    async (auth: AuthResponse) => {
      TokenStorage.setAuth({
        token: auth.token,
        refreshToken: auth.refreshToken,
        expiresIn: auth.expiresIn,
        user: {
          id: auth.userId,
          name: auth.name,
          email: auth.email,
        } as User,
      });

      const me = await authService.getCurrentUser();
      if (!me.data) {
        clearSession();
        throw new Error("Unable to verify the authenticated user.");
      }
      TokenStorage.setUser(me.data);
      setUser(me.data);
    },
    [clearSession],
  );

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
      await authService.logout();
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
