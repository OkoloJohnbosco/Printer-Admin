export type VerifyEmailReqBody = {
  otp: string;
  email: string;
};

export interface IVerifyEmailResponse {
  message: string;
  data: {
    resetToken: string;
  };
  timestamp: string;
}
