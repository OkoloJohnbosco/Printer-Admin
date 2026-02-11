import {
  PAYSTACK_BASE_URL,
  PRINTA_APP_KEY,
  S3_BASE_URL,
} from "@/lib/constants";
import { ENDPOINTS } from "@/lib/endpoints";
import { User } from "@/lib/hooks/profile/use-get-user-profile";
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { AxiosBaseQueryProps, CustomMethod } from "./api.types";

// External APIs that should not receive the Printa auth token
const EXTERNAL_API_URLS = [PAYSTACK_BASE_URL, S3_BASE_URL];

export interface ILoginResponse {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

// Define public routes (should match middleware)
const publicRoutes = [
  "/auth/login",
  "/auth/sign-up",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/", // Home page
  "/products", // Public products listing
  "/discover-print-hubs",
  "/hubs",
  "/why-printa",
  "/become-a-partner",
  "/recycle-program",
  "/auth/password/change",
];

// Check if current page is a protected route
function isProtectedRoute(pathname: string): boolean {
  // Check if the route is public (exact match or starts with public route)
  const isPublic = publicRoutes.some((route) => {
    // Exact match
    if (pathname === route) return true;
    // Allow sub-routes for certain public routes (e.g., /products/123)
    if (route !== "/" && pathname.startsWith(route + "/")) return true;
    return false;
  });

  return !isPublic;
}

// Token refresh state management
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Subscribe to token refresh
const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// Notify all subscribers when token is refreshed
const onTokenRefreshed = (newToken: string) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

// Reject all subscribers on refresh failure
const onRefreshFailed = () => {
  refreshSubscribers = [];
};

const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = await getCookie(PRINTA_APP_KEY.REFRESH);

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const url =
    process.env.NEXT_PUBLIC_CORE_BASE_URL + ENDPOINTS.AUTH_REFRESH_TOKEN;

  const response = await axios.post<ILoginResponse>(url, undefined, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  // Save new tokens
  setUserSession(response.data?.data);
  return response.data?.data?.accessToken;
};

export async function logout() {
  deleteCookie(PRINTA_APP_KEY.TOKEN);
  deleteCookie(PRINTA_APP_KEY.USER);
  console.log("logged out successfully");
}

export async function logoutFromAllDevices() {
  deleteCookie(PRINTA_APP_KEY.TOKEN);
  deleteCookie(PRINTA_APP_KEY.REFRESH);
  deleteCookie(PRINTA_APP_KEY.USER);
}

export async function getSessionToken() {
  const session = await getCookie(PRINTA_APP_KEY.TOKEN);
  if (!session) {
    return null;
  } else {
    return session;
  }
}

export function updateUserSession(
  updatedUser: Record<string, string | number>,
) {
  const session = getCookie("user_session");
  if (!session) {
    return;
  }

  const user = JSON.parse(session as string);
  const newUser = {
    ...user,
    ...updatedUser,
  };
  setCookie("user_session", JSON.stringify(newUser));
}

export function getUserSession() {
  const session = getCookie(PRINTA_APP_KEY.USER);
  if (!session) {
    return null;
  }
  return JSON.parse(session as string) as User;
}

export function setUserSession(data: ILoginResponse["data"]) {
  setCookie(PRINTA_APP_KEY.TOKEN, data?.accessToken);
  setCookie(PRINTA_APP_KEY.REFRESH, data?.refreshToken);
}

axios.interceptors.request.use(
  async (config) => {
    // Check if this is an external API call (e.g., Paystack)
    const isExternalApi = EXTERNAL_API_URLS.some((url) =>
      config.url?.startsWith(url),
    );
    // Skip adding Printa auth token for external APIs
    if (isExternalApi) {
      return config;
    }

    const session = await getCookie(PRINTA_APP_KEY.TOKEN);
    const token = session;
    const isAuthRoute = config.url?.includes("/auth");
    const isChangePasswordRoute = config.url?.includes("/auth/password/change");

    if (token && !isExternalApi && (!isAuthRoute || isChangePasswordRoute)) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip if no config (network error) or already retried
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Skip external API calls from token refresh logic
    const isExternalApi = EXTERNAL_API_URLS.some((url) =>
      originalRequest.url?.startsWith(url),
    );
    if (isExternalApi) {
      return Promise.reject(error);
    }

    // Skip auth routes (except /me/profile which needs token)
    const isAuthRoute =
      originalRequest.url?.includes("/auth") &&
      !originalRequest.url?.includes("/me/profile");

    if (isAuthRoute) {
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized
    if (error?.response?.status === 401) {
      // Already retried and still failed - logout and redirect
      if (originalRequest._retry) {
        await handleAuthFailure();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((newToken: string) => {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            resolve(axios(originalRequest));
          });
          // Set a timeout to reject if refresh takes too long
          setTimeout(() => reject(error), 10000);
        });
      }

      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken();

        // Notify all queued requests
        onTokenRefreshed(newAccessToken);
        isRefreshing = false;

        // Retry original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Refresh failed - reject all queued requests
        onRefreshFailed();
        isRefreshing = false;

        // Logout and redirect
        await handleAuthFailure();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

// Handle authentication failure
async function handleAuthFailure() {
  await logoutFromAllDevices();

  // Only redirect if on a protected page and in browser
  if (
    typeof window !== "undefined" &&
    isProtectedRoute(window.location.pathname)
  ) {
    // Use replace to prevent back button from returning to protected page
    window.location.replace("/auth/login");
  }
}

export async function axiosBaseQuery({
  url,
  method = "get",
  body,
  headers: requestHeader,
  extraConfig = {},
}: AxiosBaseQueryProps) {
  const givenMethod = method.toLocaleLowerCase() as CustomMethod;

  const headers = {
    "Content-Type": "application/json",
    ...requestHeader,
    ...extraConfig.headers,
  };

  if (givenMethod === "get" || (givenMethod === "delete" && !body)) {
    return axios[givenMethod](url, {
      ...extraConfig,
      params: {
        ...body,
      },

      headers,
    });
  }
  if (givenMethod === "delete" && body) {
    return axios.delete(url, {
      headers: {
        ...headers,
      },
      data: body,
    });
  }

  return axios[givenMethod](url, body, { headers });
}
