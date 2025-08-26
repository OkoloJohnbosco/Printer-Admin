import { PRINTA_APP_KEY } from "@/lib/constants";
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { AxiosBaseQueryProps, CustomMethod } from "./api.types";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export interface ILoginResponse {
  message: string;
  data: {
    user: User;
    access_token: string;
    refresh_token: string;
  };
  timestamp: string;
}

export async function logout() {
  deleteCookie(PRINTA_APP_KEY.TOKEN);
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

export function getUserSession() {
  const session = getCookie(PRINTA_APP_KEY.USER);
  if (!session) {
    return null;
  }
  return JSON.parse(session as string) as User;
}

export function updateUserSession(
  updatedUser: Record<string, string | number>
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
  setCookie(PRINTA_APP_KEY.TOKEN, data?.access_token);
  setCookie(PRINTA_APP_KEY.REFRESH, data?.refresh_token);
  setCookie(PRINTA_APP_KEY.USER, JSON.stringify(data?.user));
}

axios.interceptors.request.use(
  async (config) => {
    const session = await getCookie(PRINTA_APP_KEY.TOKEN);
    const token = session;
    const isAuthRoute = config.url?.includes("/auth");

    if (token && !isAuthRoute) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAuthRoute = originalRequest.url?.includes("/auth");
    if (
      error?.response?.status === 401 &&
      !isAuthRoute &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      logout();
    }
    return Promise.reject(error);
  }
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
