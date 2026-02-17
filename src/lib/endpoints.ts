import { HubStatus } from "./hooks/admin/use-get-all-hubs/index";
import { GetAllPartnerApplicationsParams } from "./hooks/admin/use-get-all-partner-applications/use-get-all-partner-applications.types";
import { GetAuditLogsParams } from "./hooks/audit-logs/use-get-audit-logs/use-get-audit-logs.types";
import { GetAllDesignerRequestsParams } from "./hooks/design-requests/use-get-all-designer-requests/use-get-all-designer-requests.types";
import { GetAllOrdersParams } from "./hooks/orders/use-get-all-orders/use-get-all-orders.types";
import { GetAllPayoutsParams } from "./hooks/payouts/use-get-all-payouts/use-get-all-payouts.types";
import { GetDashboardStatsParams } from "./hooks/stats/use-get-dashboard-stats/use-get-dashboard-stats.types";
import { GetHubStatsParams } from "./hooks/stats/use-get-hub-stats/use-get-hub-stats.types";
import { GetOrderStatsParams } from "./hooks/stats/use-get-order-stats/use-get-order-stats.types";
import { GetUserStatsParams } from "./hooks/stats/use-get-user-stats/use-get-user-stats.types";
import { GetAllUsersParams } from "./hooks/users/use-get-all-users/use-get-all-users.types";

export const ENDPOINTS = {
  // Auth Endpoint
  AUTH_SIGNUP: "auth/signup",
  AUTH_LOGIN: "auth/login",
  AUTH_VERIFY_RESET_PASSWORD_OTP: "auth/password/reset/otp/verify",
  AUTH_GOOGLE: "auth/google",
  AUTH_RESEND_VERIFICATION: "auth/resend-verification",
  AUTH_FORGOT_PASSWORD: "auth/password/reset/initiate",
  AUTH_CHANGE_PASSWORD: "auth/password/change",
  AUTH_REFRESH_TOKEN: "auth/refresh",
  AUTH_RESET_PASSWORD: "auth/password/reset/complete",

  AUTH_VALIDATE_RESET_TOKEN: "auth/validate-reset-token",

  GET_USER_DATA: "me/profile",
  UPDATE_USER_PROFILE: "me/profile",
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

  GET_ALL_PARTNER_APPLICATIONS: (params: GetAllPartnerApplicationsParams) => {
    const searchParams = new URLSearchParams();
    if (params.cursor) {
      searchParams.set("cursor", params.cursor);
    }
    if (params.limit) {
      searchParams.set("limit", params.limit.toString());
    }
    if (params.search) {
      searchParams.set("search", params.search);
    }
    return `admin/partner-applications?${searchParams.toString()}`;
  },

  CREATE_PRODUCT: `admin/products`,
  GET_ALL_PRODUCTS: (categoryId?: string) =>
    `admin/products${categoryId ? `?categoryId=${categoryId}` : ""}`,
  GET_PRODUCT_BY_ID: (productId: string) => `admin/products/${productId}`,
  UPDATE_PRODUCT_BY_ID: (productId: string) => `admin/products/${productId}`,
  DELETE_PRODUCT_BY_ID: (productId: string) => `admin/products/${productId}`,
  GET_ALL_USERS: (params: GetAllUsersParams) => {
    const searchParams = new URLSearchParams();
    if (params.cursor) {
      searchParams.set("cursor", params.cursor);
    }
    if (params.limit) {
      searchParams.set("limit", params.limit.toString());
    }
    if (params.role) {
      searchParams.set("role", params.role);
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
    return `admin/users?${searchParams.toString()}`;
  },
  GET_USER_BY_ID: (userId: string) => `admin/users/${userId}`,

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
  GET_ELIGIBLE_HUBS: (orderId: string) =>
    `admin/orders/${orderId}/eligible-hubs`,
  REASSIGN_ORDER: (orderId: string) => `admin/orders/${orderId}/reassign`,
  DELIVER_ORDER: (orderId: string) => `admin/orders/${orderId}/deliver`,

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

  // Designer Requests Endpoints
  GET_ALL_DESIGNER_REQUESTS: (params: GetAllDesignerRequestsParams) => {
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
    return `admin/designer-requests?${searchParams.toString()}`;
  },
  UPDATE_DESIGNER_REQUEST: (requestId: string) =>
    `admin/designer-requests/${requestId}`,
  GET_DESIGNER_REQUEST_BY_ID: (requestId: string) =>
    `admin/designer-requests/${requestId}`,

  // Audit Logs Endpoints
  GET_AUDIT_LOGS: (params: GetAuditLogsParams) => {
    const searchParams = new URLSearchParams();
    if (params.cursor) {
      searchParams.set("cursor", params.cursor);
    }
    if (params.limit) {
      searchParams.set("limit", params.limit.toString());
    }
    if (params.actorId) {
      searchParams.set("actorId", params.actorId);
    }
    if (params.action) {
      searchParams.set("action", params.action);
    }
    if (params.startDate) {
      searchParams.set("startDate", params.startDate);
    }
    if (params.endDate) {
      searchParams.set("endDate", params.endDate);
    }
    return `admin/logs/audit?${searchParams.toString()}`;
  },

  // Notification Endpoints
  GET_NOTIFICATIONS: (limit: number, cursor?: string) =>
    `notifications?limit=${limit}${cursor ? `&cursor=${cursor}` : ""}`,
  GET_NOTIFICATIONS_STREAM: "notifications/stream",
  GET_UNREAD_NOTIFICATION_COUNT: "notifications/unread-count",
  MARK_NOTIFICATION_AS_READ: (notificationId: string) =>
    `notifications/${notificationId}/read`,
  MARK_ALL_NOTIFICATIONS_AS_READ: "notifications/read-all",

  // Stats Endpoints
  GET_DASHBOARD_STATS: (params: GetDashboardStatsParams) => {
    const searchParams = new URLSearchParams();
    if (params.startDate) {
      searchParams.set("startDate", params.startDate);
    }
    if (params.endDate) {
      searchParams.set("endDate", params.endDate);
    }
    const queryString = searchParams.toString();
    return `admin/stats/dashboard${queryString ? `?${queryString}` : ""}`;
  },
  GET_ORDER_STATS: (params: GetOrderStatsParams) => {
    const searchParams = new URLSearchParams();
    if (params.startDate) {
      searchParams.set("startDate", params.startDate);
    }
    if (params.endDate) {
      searchParams.set("endDate", params.endDate);
    }
    const queryString = searchParams.toString();
    return `admin/stats/orders${queryString ? `?${queryString}` : ""}`;
  },
  GET_HUB_STATS: (params: GetHubStatsParams) => {
    const searchParams = new URLSearchParams();
    if (params.startDate) {
      searchParams.set("startDate", params.startDate);
    }
    if (params.endDate) {
      searchParams.set("endDate", params.endDate);
    }
    const queryString = searchParams.toString();
    return `admin/stats/hubs${queryString ? `?${queryString}` : ""}`;
  },
  GET_USER_STATS: (params: GetUserStatsParams) => {
    const searchParams = new URLSearchParams();
    if (params.startDate) {
      searchParams.set("startDate", params.startDate);
    }
    if (params.endDate) {
      searchParams.set("endDate", params.endDate);
    }
    const queryString = searchParams.toString();
    return `admin/stats/users${queryString ? `?${queryString}` : ""}`;
  },

  // Files Endpoints
  GET_PRESIGNED_URL: (params: {
    context: string;
    contentType: string;
    fileSize: number;
  }) => {
    const searchParams = new URLSearchParams();
    searchParams.append("context", params.context);
    searchParams.append("contentType", params.contentType);
    searchParams.append("fileSize", String(params.fileSize));
    return `files/presigned-url?${searchParams.toString()}`;
  },
};

//  for tracking react-query useQuery hooks and for revalidation
export const QUERYKEYS = {
  GET_USER_DATA: "GET_USER_DATA",
  UPDATE_USER_PROFILE: "UPDATE_USER_PROFILE",
  GOOGLE_AUTH: "GOOGLE_AUTH",
  GOOGLE_AUTH_USER_SESSION: "GOOGLE_AUTH_USER_SESSION",

  GET_HUB_BY_ID: "GET_HUB_BY_ID",
  GET_ALL_HUBS: "GET_ALL_HUBS",
  GET_ALL_PARTNER_APPLICATIONS: "GET_ALL_PARTNER_APPLICATIONS",
  GET_ALL_PRODUCTS: "GET_ALL_PRODUCTS",
  GET_ALL_USERS: "GET_ALL_USERS",
  GET_USER_BY_ID: "GET_USER_BY_ID",
  GET_PRODUCT_BY_ID: "GET_PRODUCT_BY_ID",
  GET_PRODUCT_CATEGORY_BY_ID: "GET_PRODUCT_CATEGORY_BY_ID",
  GET_ALL_PRODUCT_CATEGORIES: "GET_ALL_PRODUCT_CATEGORIES",

  GET_ALL_ORDERS: "GET_ALL_ORDERS",
  GET_ORDER_BY_ID: "GET_ORDER_BY_ID",
  GET_ELIGIBLE_HUBS: "GET_ELIGIBLE_HUBS",

  GET_SYSTEM_CONFIG: "GET_SYSTEM_CONFIG",
  GET_DELIVERY_PRICE_CONFIG: "GET_DELIVERY_PRICE_CONFIG",

  GET_ALL_PAYOUTS: "GET_ALL_PAYOUTS",

  GET_AUDIT_LOGS: "GET_AUDIT_LOGS",

  // Designer Requests Query Keys
  GET_ALL_DESIGNER_REQUESTS: "GET_ALL_DESIGNER_REQUESTS",
  GET_DESIGNER_REQUEST_BY_ID: "GET_DESIGNER_REQUEST_BY_ID",

  // Notification Query Keys
  GET_NOTIFICATIONS: "GET_NOTIFICATIONS",
  GET_UNREAD_NOTIFICATION_COUNT: "GET_UNREAD_NOTIFICATION_COUNT",

  // Stats Query Keys
  GET_DASHBOARD_STATS: "GET_DASHBOARD_STATS",
  GET_ORDER_STATS: "GET_ORDER_STATS",
  GET_HUB_STATS: "GET_HUB_STATS",
  GET_USER_STATS: "GET_USER_STATS",

  // Files Query Keys
  GET_PRESIGNED_URL: "GET_PRESIGNED_URL",
};
