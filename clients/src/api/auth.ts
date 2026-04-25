import api from "./axios";
import type { AuthUser } from "../utils/auth";

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterResponse {
  data: {
    user: AuthUser;
  };
}

interface LoginResponse {
  data: {
    token: string;
    user: AuthUser;
  };
}

interface CurrentUserResponse {
  data: AuthUser;
}

export const registerUser = async (payload: RegisterPayload): Promise<AuthUser> => {
  const response = await api.post<RegisterResponse>("/auth/register", payload);
  return response.data.data.user;
};

export const loginUser = async (
  payload: LoginPayload,
): Promise<{ token: string; user: AuthUser }> => {
  const response = await api.post<LoginResponse>("/auth/login", payload);
  return {
    token: response.data.data.token,
    user: response.data.data.user,
  };
};

export const getCurrentUser = async (): Promise<AuthUser> => {
  const response = await api.get<CurrentUserResponse>("/auth/me");
  return response.data.data;
};
