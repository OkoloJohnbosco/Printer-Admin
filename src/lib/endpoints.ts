import { HubStatus } from "./hooks/admin/use-get-all-hubs/index";
import { GetAllOrdersParams } from "./hooks/orders/use-get-all-orders/use-get-all-orders.types";
import { GetAllPayoutsParams } from "./hooks/payouts/use-get-all-payouts/use-get-all-payouts.types";

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
    limit: number,
    cursor?: string,
    status?: HubStatus,
    search?: string,
    location?: string,
  ) =>
    `admin/hubs${limit ? `?limit=${limit}` : ""}${cursor ? `&cursor=${cursor}` : ""}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}${location ? `&location=${location}` : ""}`,
  GET_HUB_BY_ID: (hubId: string) => `admin/hubs/${hubId}`,
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
  REVIEW_HUB_DOCUMENT: (documentId: string) =>
    `admin/documents/${documentId}/review`,

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

  // Order Endpoints
  GET_ALL_ORDERS: (params: GetAllOrdersParams) => {
    const searchParams = new URLSearchParams();
    if (params.cursor) {
      searchParams.set("cursor", params.cursor);
    }
    if (params.limit) {
      searchParams.set("limit", params.limit.toString());
    }
    if (params.status) {
      searchParams.set("status", params.status);
    }
    if (params.hubId) {
      searchParams.set("hubId", params.hubId);
    }
    if (params.startDate) {
      searchParams.set("startDate", params.startDate);
    }
    if (params.endDate) {
      searchParams.set("endDate", params.endDate);
    }
    if (params.search) {
      searchParams.set("search", params.search);
    }
    return `admin/orders?${searchParams.toString()}`;
  },
  GET_ORDER_BY_ID: (orderId: string) => `admin/orders/${orderId}`,
  REASSIGN_ORDER: (orderId: string) => `admin/orders/${orderId}/reassign`,

  // System Config Endpoints
  CREATE_SYSTEM_CONFIG: "admin/configs",
  GET_SYSTEM_CONFIG: "admin/configs",
  UPDATE_SYSTEM_CONFIG: (configId: string) => `admin/configs/${configId}`,
  DELETE_SYSTEM_CONFIG: (configId: string) => `admin/configs/${configId}`,
  GET_DELIVERY_PRICE_CONFIG: "admin/configs/delivery",
  UPDATE_DELIVERY_PRICE_CONFIG: "admin/configs/delivery",

  // Payouts Endpoints
  REVIEW_PAYOUT_REQUEST: (orderId: string) => `admin/payouts/${orderId}/review`,
  GET_ALL_PAYOUTS: (params: GetAllPayoutsParams) => {
    const searchParams = new URLSearchParams();
    if (params.cursor) {
      searchParams.set("cursor", params.cursor);
    }
    if (params.limit) {
      searchParams.set("limit", params.limit.toString());
    }
    if (params.status) {
      searchParams.set("status", params.status);
    }
    if (params.hubId) {
      searchParams.set("hubId", params.hubId);
    }
    if (params.orderId) {
      searchParams.set("orderId", params.orderId);
    }
    if (params.type) {
      searchParams.set("type", params.type);
    }
    return `admin/payouts?${searchParams.toString()}`;
  },
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

  GET_ALL_ORDERS: "GET_ALL_ORDERS",
  GET_ORDER_BY_ID: "GET_ORDER_BY_ID",

  GET_SYSTEM_CONFIG: "GET_SYSTEM_CONFIG",
  GET_DELIVERY_PRICE_CONFIG: "GET_DELIVERY_PRICE_CONFIG",

  GET_ALL_PAYOUTS: "GET_ALL_PAYOUTS",
};
