import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User } from "../types";
import type { LoginPayload, RegisterPayload } from "../api/authApi";
import { authApi } from "../api/authApi";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    
    try {
      const response = await authApi.getCurrentUser();
      // Server returns { success, data: user }
      setUser(response.data.data);
    } catch (err) {
      localStorage.removeItem("token");
      console.error("Error fetching current user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = async (payload: LoginPayload) => {
    try {
      setLoading(true);
      setError("");
      const result = await authApi.login(payload);
      // Server returns { success, data: { token, user } }
      const { token, user } = result.data;
      localStorage.setItem("token", token);
      setUser(user);
    } catch (err: any) {
      const message = err.response?.data?.error || err.response?.data?.message || "Login failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    try {
      setLoading(true);
      setError("");
      await authApi.register(payload);
    } catch (err: any) {
      const message = err.response?.data?.error || err.response?.data?.message || "Registration failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateUser = async (data: Partial<User>) => {
    try {
      const response = await authApi.updateProfile(data);
      setUser(response.data);
    } catch (err) {
      setError("Failed to update profile");
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}