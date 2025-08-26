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

  //   Cars Endpoints
  GET_APPROVED_VEHICLES: (
    page: number,
    limit: number,
    use?: string,
    bodyType?: string,
    vehicleType?: string,
    make?: string,
    model?: string,
    minPrice?: string,
    maxPrice?: string,
    minYear?: string,
    maxYear?: string,
    location?: string,
    state?: string,
    seller?: string,
    fuelType?: string,
    minBatteryWarranty?: number,
    maxBatteryWarranty?: number,
    minBatteryCapacity?: number,
  ) =>
    `vehicles/distinct${page ? `?page=${page}` : ""}${limit ? `&limit=${limit}` : ""}${use ? `&use=${use}` : ""}${bodyType ? `&bodyType=${bodyType}` : ""}
      ${vehicleType ? `&vehicleType=${vehicleType}` : ""}${make ? `&make=${make}` : ""}${model ? `&model=${model}` : ""}${minPrice ? `&minPrice=${minPrice}` : ""}
      ${maxPrice ? `&maxPrice=${maxPrice}` : ""}${minYear ? `&minYear=${minYear}` : ""}${maxYear ? `&maxYear=${maxYear}` : ""}${location ? `&location=${location}` : ""}
      ${state ? `&state=${state}` : ""}${seller ? `&seller=${seller}` : ""}${fuelType ? `&fuelType=${fuelType}` : ""}${minBatteryWarranty ? `&minBatteryWarranty=${minBatteryWarranty}` : ""}
      ${maxBatteryWarranty ? `&maxBatteryWarranty=${maxBatteryWarranty}` : ""}${minBatteryCapacity ? `&minBatteryCapacity=${minBatteryCapacity}` : ""}`,
  CREATE_NEW_VEHICLE_LISTING: "vehicles",
  GET_USER_PURCHASED_VEHICLES: (page: number, limit: number) =>
    `vehicles/my-vehicles${page ? `?page=${page}` : ""}${limit ? `&limit=${limit}` : ""}`,
  GET_VENDOR_CAR_LISTING: (page: number, limit: number) =>
    `vehicles/vendor/my-listings${page ? `?page=${page}` : ""}${limit ? `&limit=${limit}` : ""}`,
  GET_VEHICLE_BY_EVOOLV_ID: (evoolvId: string) => `vehicles/evolve/${evoolvId}`,
  GET_VEHICLE_BY_ID: (vehicleId: string) => `vehicles/${vehicleId}`,
  GET_TOP_PICKS_EV: () => `vehicles/top-picks`,
  PURCHASE_VEHICLE: "vehicles/buy",
  GET_VEHICLE_FILTERS: "vehicles/filters",

  //   KYC Endpoints
  SUBMIT_INDIVIDUAL_KYC: "kyc/individual",
  SUBMIT_BUSINESS_KYC: "kyc/business",
  GET_KYC_STATS: "kyc/status",

  //   Upload Endpoints
  UPLOAD_IMAGE_FILE: "upload/image",
  UPLOAD_VIDEO_FILE: "upload/video",
  UPLOAD_DOCUMENT_FILE: "upload/document",
  UPLOAD_THUMBNAIL_IMAGE: "upload/thumbnail",
};

//  for tracking react-query useQuery hooks and for revalidation
export const QUERYKEYS = {
  GET_USER_DATA: "GET_USER_DATA",
  GOOGLE_AUTH: "GOOGLE_AUTH",
  GOOGLE_AUTH_USER_SESSION: "GOOGLE_AUTH_USER_SESSION",

  // Cars
  GET_APPROVED_VEHICLES: "GET_APPROVED_VEHICLES",
  GET_USER_PURCHASED_VEHICLES: "GET_USER_PURCHASED_VEHICLES",
  GET_VENDOR_CAR_LISTING: "GET_VENDOR_CAR_LISTING",
  GET_VEHICLE_BY_EVOOLV_ID: "GET_VEHICLE_BY_EVOOLV_ID",
  GET_VEHICLE_BY_ID: "GET_VEHICLE_BY_ID",
  GET_TOP_PICKS_EV: "GET_TOP_PICKS_EV",
  GET_VEHICLE_FILTERS: "GET_VEHICLE_FILTERS",

  // Kyc keys
  GET_KYC_STATS: "GET_KYC_STATS",
};
