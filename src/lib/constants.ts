export const PRINTA_APP_KEY = {
  TOKEN: "printa__app_auth_session",
  REFRESH: "printa__app_refresh_session",
  USER: "printa__app_user_session",
};

export const baseURL =
  process.env.NEXT_PUBLIC_CORE_BASE_URL ?? "https://api.printa.africa/";
