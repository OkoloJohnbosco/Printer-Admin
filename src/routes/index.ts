const routes = {
  ROOT: "/",

  // EXTERNAL PAGES ROUTES
  ABOUT_US: "/about-us",
  CONTACT_US: "/contact-us",

  // AUTH ROUTES
  SIGN_UP: "/auth/sign-up",
  SIGN_UP_VERIFY_EMAIL: "/auth/sign-up/verify-email",
  LOGIN: "/auth/login",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  VERIFY_EMAIL: "/auth/verify-email",
  FORGET_PASSWORD_VERIFY_EMAIL: "/auth/forgot-password/verify-email",

  // DASHBOARD ROUTES
  DASHBOARD: "/dashboard",
  DESIGN_REQUESTS: "/design-requests",
  CATEGORIES: "/categories",
  PRODUCTS: "/products",
  PRODUCTS_NEW: "/products/new",
  ORDER_MANAGEMENT: "/orders",
  HUB_MANAGEMENT: "/print-hubs",
  USER_MANAGEMENT: "/users",
  MY_ACCOUNT: "/my-account",
  SYSTEM_CONFIG: "/system-config",
  AUDIT_LOGS: "/audit-logs",
  REVENUE_AND_PAYOUT: "/revenue-and-payout",
  PAYOUT_DETAILS: (payoutIdOrReference: string) =>
    `/revenue-and-payout/${payoutIdOrReference}`,
  HUB_DETAILS: (hubId: string) => `/print-hubs/${hubId}`,
  PARTNER_APPLICATIONS: "/partner-applications",

  NOTIFICATIONS: "/notifications",
  HELP_AND_SUPPORT: "/help-and-support",
};

export default routes;
