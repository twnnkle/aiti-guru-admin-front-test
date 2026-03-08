import { createContext, useContext, useEffect, useState } from "react";

import type { UserI, AuthFieldsI, LoginResponseI } from "../types/auth";

import { API_BASE_URL } from "../config";

interface AuthContextI {
  user: UserI | null;
  login: (authFields: AuthFieldsI) => Promise<LoginResponseI>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextI | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен использоваться в AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserI | null>(null);
  const [loading, setLoading] = useState(true);

  const getAccessToken = () => {
    return (
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken")
    );
  };

  const clearTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
  };

  const refreshToken = async (): Promise<string | null> => {
    const refreshToken =
      localStorage.getItem("refreshToken") ||
      sessionStorage.getItem("refreshToken");

    if (!refreshToken) return null;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Не удалось обновить токен авторизации");
      }

      const data = await response.json();

      const storage = localStorage.getItem("refreshToken")
        ? localStorage
        : sessionStorage;

      storage.setItem("accessToken", data.accessToken);
      storage.setItem("refreshToken", data.refreshToken);

      return data.accessToken;
    } catch (error) {
      console.error("Ошибка обновления токена авторизации:", error);
      return null;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = getAccessToken();
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        let response = await fetch(`${API_BASE_URL}/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 401) {
          const newToken = refreshToken();

          if (newToken) {
            try {
              response = await fetch(`${API_BASE_URL}/auth/me`, {
                headers: {
                  Authorization: `Bearer ${newToken}`,
                },
              });
            } catch (error) {
              console.error("Ошибка обновления токена авторизации:", error);
            }
          }
        }

        if (!response.ok) {
          setUser(null);
          clearTokens();
          throw new Error("Не удалось получить данные пользователя");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Ошибка при проверке авторизации:", error);
        clearTokens();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (authFields: AuthFieldsI): Promise<LoginResponseI> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: authFields.username,
          password: authFields.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Не удалось войти");
      }

      const data: LoginResponseI = await response.json();
      const storage = authFields.rememberMe ? localStorage : sessionStorage;
      storage.setItem("accessToken", data.accessToken);
      storage.setItem("refreshToken", data.refreshToken);

      setUser(data);
      return data;
    } catch (error) {
      console.error("Ошибка при входе:", error);
      throw error;
    }
  };

  const value: AuthContextI = {
    user,
    login,
    isAuthenticated: !!user,
    isLoading: loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
