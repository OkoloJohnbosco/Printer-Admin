import { PRINTA_APP_KEY } from "@/lib/constants";
import { ENDPOINTS } from "@/lib/endpoints";
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { AxiosBaseQueryProps, CustomMethod } from "./api.types";

export interface ILoginResponse {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const refreshAccessToken = async () => {
  const refreshToken = await getCookie(PRINTA_APP_KEY.REFRESH);
  const url =
    process.env.NEXT_PUBLIC_CORE_BASE_URL + ENDPOINTS.AUTH_REFRESH_TOKEN;
  try {
    const response = await axios.post(url, {
      refresh_token: refreshToken,
    });
    // Save new access token

    return response.data.access_token;
  } catch (error) {
    // Handle refresh token expiration or failure
    console.error("Refresh token failed", error);
    throw error;
  }
};

export async function logout() {
  deleteCookie(PRINTA_APP_KEY.TOKEN);
  deleteCookie(PRINTA_APP_KEY.REFRESH);

  // Only redirect if we're in the browser (not server-side)
  if (typeof window !== "undefined") {
    window.location.href = "/auth/login";
  }
}

export async function logoutAndRedirect() {
  // Clear cookies
  deleteCookie(PRINTA_APP_KEY.TOKEN);
  deleteCookie(PRINTA_APP_KEY.REFRESH);

  // Redirect to login page
  if (typeof window !== "undefined") {
    window.location.href = "/auth/login";
  }
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

export function setUserSession(data: ILoginResponse["data"]) {
  setCookie(PRINTA_APP_KEY.TOKEN, data?.accessToken);
  setCookie(PRINTA_APP_KEY.REFRESH, data?.refreshToken);
}

axios.interceptors.request.use(
  async (config) => {
    const session = await getCookie(PRINTA_APP_KEY.TOKEN);
    const token = session;
    const isAuthRoute = config.url?.includes("/auth");

    if (token && (!isAuthRoute || config.url?.includes("/me/profile"))) {
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
    const isAuthRoute =
      originalRequest.url?.includes("/auth") &&
      !originalRequest.url?.includes("/me/profile");
    if (error?.response?.status === 401 && !isAuthRoute) {
      originalRequest._retry = true;
      // Log the user out and redirect to login page
      await logout();
    }
    return Promise.reject(error);
  },
);

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
