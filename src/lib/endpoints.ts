export const ENDPOINTS = {
  // Auth Endpoint
  AUTH_SIGNUP: "auth/signup",
  AUTH_LOGIN: "auth/login",
  AUTH_VERIFY_RESET_PASSWORD_OTP: "auth/password/reset/otp/verify",
  AUTH_GOOGLE: "auth/google",
  AUTH_RESEND_VERIFICATION: "auth/resend-verification",
  AUTH_FORGOT_PASSWORD: "auth/password/reset/initiate",

  AUTH_RESET_PASSWORD: "auth/password/reset/complete",

  AUTH_VALIDATE_RESET_TOKEN: "auth/validate-reset-token",

  GET_USER_DATA: "auth/me",
  GOOGLE_AUTH: (callBackURL: string) =>
    `auth/google${callBackURL ? `?callback=${callBackURL}` : ""}`,

  //  Admin Endpoints
  GET_ALL_HUBS: (
    page: number,
    limit: number,
    status: "PENDING" | "APPROVED" | "REJECTED",
  ) =>
    `admin/hubs${page ? `?cursor=${page}` : ""}${limit ? `&limit=${limit}` : ""}${status ? `&status=${status}` : ""}`,
  GET_ALL_PRODUCT_CATEGORIES: `admin/product/categories`,
  CREATE_PRODUCT_CATEGORY: `admin/product/category`,
  GET_HUB_BY_ID: (hubId: string) => `admin/hub/${hubId}`,
  GET_PRODUCT_CATEGORY_BY_ID: (categoryId: string) =>
    `admin/product/category/${categoryId}`,
  DELETE_PRODUCT_CATEGORY_BY_ID: (categoryId: string) =>
    `admin/product/category/${categoryId}`,
  UPDATE_PRODUCT_CATEGORY_BY_ID: (categoryId: string) =>
    `admin/product/category/${categoryId}`,
  UPDATE_VERIFICATION_STATUS: (hubId: string) =>
    `admin/hubs/${hubId}/verification-status`,

  GET_PRODUCT_BY_ID: (productId: string) => `admin/product/${productId}`,
  GET_ALL_PRODUCTS: (page: number, limit: number) =>
    `admin/products${page ? `?cursor=${page}` : ""}${limit ? `&limit=${limit}` : ""}`,
  GET_ALL_USERS: (page: number, limit: number) =>
    `admin/users${page ? `?cursor=${page}` : ""}${limit ? `&limit=${limit}` : ""}`,
};

//  for tracking react-query useQuery hooks and for revalidation
export const QUERYKEYS = {
  GET_USER_DATA: "GET_USER_DATA",
  GOOGLE_AUTH: "GOOGLE_AUTH",
  GOOGLE_AUTH_USER_SESSION: "GOOGLE_AUTH_USER_SESSION",

  GET_HUB_BY_ID: "GET_HUB_BY_ID",
  GET_ALL_HUBS: "GET_ALL_HUBS",
  GET_ALL_PRODUCTS: "GET_ALL_PRODUCTS",
  GET_ALL_USERS: "GET_ALL_USERS",
  GET_PRODUCT_BY_ID: "GET_PRODUCT_BY_ID",
  GET_PRODUCT_CATEGORY_BY_ID: "GET_PRODUCT_CATEGORY_BY_ID",
  GET_ALL_PRODUCT_CATEGORIES: "GET_ALL_PRODUCT_CATEGORIES",
  CREATE_PRODUCT_CATEGORY: "CREATE_PRODUCT_CATEGORY",
};
