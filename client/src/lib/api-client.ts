import axios, { AxiosInstance, AxiosError } from "axios";
import Cookies from "js-cookie";

export enum ServiceType {
  ORDER = "ORDER",
  SHOP = "SHOP",
  PRODUCT = "PRODUCT",
  USER = "USER",
}

const SERVICE_PORTS: Record<ServiceType, string> = {
  [ServiceType.ORDER]: import.meta.env.VITE_ORDER_API_URL || "http://localhost:4000",
  [ServiceType.SHOP]: import.meta.env.VITE_SHOP_API_URL || "http://localhost:4001",
  [ServiceType.PRODUCT]: import.meta.env.VITE_PRODUCT_API_URL || "http://localhost:4002",
  [ServiceType.USER]: import.meta.env.VITE_USER_API_URL || "http://localhost:4003",
};

class ApiClient {
  private instance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
  }> = [];

  constructor(serviceType: ServiceType = ServiceType.USER) {
    const baseURL = `${SERVICE_PORTS[serviceType]}/api`;

    this.instance = axios.create({
      baseURL,
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
        const session = Cookies.get("session");
        const token = session ? JSON.parse(session).accessToken : null;
        console.log("Request Interceptor - Access Token:", token);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest: any = error.config;

        const hadToken = originalRequest.headers?.Authorization;
        console.log("had token:", hadToken);
        console.log("retry flag:", originalRequest._retry);
        if (
          error.response?.status === 401 &&
          hadToken &&
          !originalRequest._retry
        ) {
          console.log("Response Interceptor - 401 Unauthorized detected");
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
            const userServiceUrl = `${
              SERVICE_PORTS[ServiceType.USER]
            }/api/auth/refresh`;
            const response = await axios.post(
              userServiceUrl,
              {
                refreshToken: Cookies.get("session")
                  ? JSON.parse(Cookies.get("session")!).refreshToken
                  : null,
              },
              { withCredentials: true },
            );
            console.log("Refresh Token Response:", response.data);
            const { accessToken } = response.data.data;
            console.log("Refreshed Access Token:", accessToken);
            const session = JSON.parse(Cookies.get("session") || "{}");
            session.accessToken = accessToken;
            Cookies.set("session", JSON.stringify(session), {
              expires: 1 / 96,
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

            if (
              !window.location.pathname.includes("/login") &&
              !window.location.pathname.includes("/signup")
            ) {
              window.location.href = "/login";
            }
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      },
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

export const apiClient = new ApiClient(ServiceType.USER);
export const orderApiClient = new ApiClient(ServiceType.ORDER);
export const shopApiClient = new ApiClient(ServiceType.SHOP);
export const productApiClient = new ApiClient(ServiceType.PRODUCT);
export const userApiClient = new ApiClient(ServiceType.USER);

export const createApiClient = (serviceType: ServiceType) => {
  return new ApiClient(serviceType);
};
