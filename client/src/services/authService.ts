import { userApiClient } from "@/lib/api-client";
import Cookies from "js-cookie";

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactNumber: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  contactNumber?: string;
  image?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
  };
}

export const authService = {
  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await userApiClient.post<AuthResponse>(
      "/auth/signup",
      data
    );

    if (response.data.success && response.data.data.accessToken) {
      Cookies.set("accessToken", response.data.data.accessToken, {
        expires: 1 / 96, // 15 minutes
        secure: true,
        sameSite: "strict",
      });
    }

    return response.data;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await userApiClient.post<AuthResponse>(
      "/auth/login",
      data
    );

    if (response.data.success && response.data.data.accessToken) {
      Cookies.set("accessToken", response.data.data.accessToken, {
        expires: 1 / 96, // 15 minutes
        secure: true,
        sameSite: "strict",
      });
    }

    return response.data;
  },

  async logout(): Promise<void> {
    await userApiClient.post("/auth/logout");
    Cookies.remove("accessToken");
  },

  async refreshToken(): Promise<{ accessToken: string }> {
    const response = await userApiClient.post<{
      success: boolean;
      data: { accessToken: string };
    }>("/auth/refresh");

    if (response.data.success && response.data.data.accessToken) {
      Cookies.set("accessToken", response.data.data.accessToken, {
        expires: 1 / 96,
        secure: true,
        sameSite: "strict",
      });
    }

    return response.data.data;
  },

  getAccessToken(): string | undefined {
    return Cookies.get("accessToken");
  },

  isAuthenticated(): boolean {
    return !!Cookies.get("accessToken");
  },
};
