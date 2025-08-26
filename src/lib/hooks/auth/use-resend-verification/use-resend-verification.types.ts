export type IResendVerificationReqBody = {
  email: string;
  type: "email_verification" | "password_reset" | "two_factor_auth";
};
