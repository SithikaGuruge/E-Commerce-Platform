import axios, { AxiosInstance, AxiosError } from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4003";

class ApiClient {
  private instance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
  }> = [];

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        const token = Cookies.get("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest: any = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return this.instance(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const response = await this.instance.post("/api/auth/refresh");
            const { accessToken } = response.data.data;

            Cookies.set("accessToken", accessToken, {
              expires: 1 / 96, // 15 minutes
              secure: true,
              sameSite: "strict",
            });

            this.failedQueue.forEach(({ resolve }) => resolve(accessToken));
            this.failedQueue = [];

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return this.instance(originalRequest);
          } catch (refreshError) {
            this.failedQueue.forEach(({ reject }) => reject(refreshError));
            this.failedQueue = [];
            Cookies.remove("accessToken");
            window.location.href = "/login";
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  get<T = any>(url: string, config?: any) {
    return this.instance.get<T>(url, config);
  }

  post<T = any>(url: string, data?: any, config?: any) {
    return this.instance.post<T>(url, data, config);
  }

  put<T = any>(url: string, data?: any, config?: any) {
    return this.instance.put<T>(url, data, config);
  }

  delete<T = any>(url: string, config?: any) {
    return this.instance.delete<T>(url, config);
  }
}

export const apiClient = new ApiClient();
