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
  PRINT_JOBS: "/dashboard/print-jobs",
  VERIFICATION: "/dashboard/verification",
  REVENUE_AND_PAYOUT: "/dashboard/revenue-and-payout",

  PORTFOLIO_AND_WORKS: "/dashboard/portfolio-and-works",
  COMPANY_STORY: "/dashboard/company-story",
  PRODUCT_OFFERINGS: "/dashboard/product-offerings",
  ORDER_MANAGEMENT: "/dashboard/order-management",

  MY_ACCOUNT: "/dashboard/my-account",
  NOTIFICATIONS: "/dashboard/notifications",
  HELP_AND_SUPPORT: "/dashboard/help-and-support",
};

export default routes;
