export const ENDPOINTS = {
  // Auth Endpoint
  AUTH_SIGNUP: "auth/signup",
  AUTH_LOGIN: "auth/login",
  AUTH_VERIFY_RESET_PASSWORD_OTP: "auth/password/reset/otp/verify",
  AUTH_GOOGLE: "auth/google",
  AUTH_RESEND_VERIFICATION: "auth/resend-verification",
  AUTH_FORGOT_PASSWORD: "auth/password/reset/initiate",
  AUTH_REFRESH_TOKEN: "auth/refresh",
  AUTH_RESET_PASSWORD: "auth/password/reset/complete",

  AUTH_VALIDATE_RESET_TOKEN: "auth/validate-reset-token",

  GET_USER_DATA: "auth/me",
  GOOGLE_AUTH: (callBackURL: string) =>
    `auth/google${callBackURL ? `?callback=${callBackURL}` : ""}`,

  //  Admin Endpoints
  GET_ALL_HUBS: (
    cursor: string,
    limit: number,
    status?: "PENDING" | "APPROVED" | "REJECTED",
  ) =>
    `admin/hubs${limit ? `?limit=${limit}` : ""}${cursor ? `&cursor=${cursor}` : ""}${status ? `&status=${status}` : ""}`,
  GET_HUB_BY_ID: (hubId: string) => `admin/hub/${hubId}`,
  UPDATE_VERIFICATION_STATUS: (hubId: string) =>
    `admin/hubs/${hubId}/verification-status`,
  CREATE_PRODUCT_CATEGORY: `admin/products/categories`,
  GET_ALL_PRODUCT_CATEGORIES: `admin/products/categories`,
  GET_PRODUCT_CATEGORY_BY_ID: (categoryId: string) =>
    `admin/products/categoriesy/${categoryId}`,
  UPDATE_PRODUCT_CATEGORY_BY_ID: (categoryId: string) =>
    `admin/products/categories/${categoryId}`,
  DELETE_PRODUCT_CATEGORY_BY_ID: (categoryId: string) =>
    `admin/products/categories/${categoryId}`,

  CREATE_PRODUCT_SUB_CATEGORY: `admin/products/sub-categories`,
  GET_ALL_PRODUCT_SUB_CATEGORIES: (categoryId: string) =>
    `admin/products/sub-categories${categoryId ? `?categoryId=${categoryId}` : ""}`,
  GET_PRODUCT_SUB_CATEGORY_BY_ID: (subCategoryId: string) =>
    `admin/products/sub-categories/${subCategoryId}`,
  UPDATE_PRODUCT_SUB_CATEGORY_BY_ID: (subCategoryId: string) =>
    `admin/products/sub-categories/${subCategoryId}`,
  DELETE_PRODUCT_SUB_CATEGORY_BY_ID: (subCategoryId: string) =>
    `admin/products/sub-categories/${subCategoryId}`,

  CREATE_PRODUCT_TEMPLATE: `admin/products/templates`,
  GET_ALL_PRODUCT_TEMPLATES: (subCategoryId?: string) =>
    `admin/products/templates${subCategoryId ? `?subCategoryId=${subCategoryId}` : ""}`,
  GET_PRODUCT_TEMPLATE_BY_ID: (templateId: string) =>
    `admin/products/templates/${templateId}`,
  UPDATE_PRODUCT_TEMPLATE_BY_ID: (templateId: string) =>
    `admin/products/templates/${templateId}`,
  DELETE_PRODUCT_TEMPLATE_BY_ID: (templateId: string) =>
    `admin/products/templates/${templateId}`,

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

  GET_ALL_PRODUCT_SUB_CATEGORIES: "GET_ALL_PRODUCT_SUB_CATEGORIES",
  GET_PRODUCT_SUB_CATEGORY_BY_ID: "GET_PRODUCT_SUB_CATEGORY_BY_ID",
  GET_ALL_PRODUCT_TEMPLATES: "GET_ALL_PRODUCT_TEMPLATES",
  GET_PRODUCT_TEMPLATE_BY_ID: "GET_PRODUCT_TEMPLATE_BY_ID",
};
