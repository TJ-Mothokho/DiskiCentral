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
import type { Login, Register } from "@/types/auth";
import type { User } from "@/types/user";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: Login) => Promise<void>;
  register: (data: Register) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
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
    const persisted = TokenStorage.getPersistedAuth();
    if (persisted && !TokenStorage.isExpired()) {
      setUser(persisted.user);
    } else if (persisted) {
      TokenStorage.clear();
    }
    setIsLoading(false);
  }, []);

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
    async (auth: {
      token: string;
      refreshToken: string;
      expiresIn: number;
      userId: string;
      name: string;
      email: string;
    }) => {
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

      try {
        const me = await authService.getCurrentUser();
        TokenStorage.setUser(me.data);
      } catch {
        // Fall back to the partial user from the auth response if /me fails.
      }

      setUser(TokenStorage.getUser());
    },
    [],
  );

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

      if (!response.requiresEmailConfirmation) {
        await persistSession(response);
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
    }),
    [user, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
