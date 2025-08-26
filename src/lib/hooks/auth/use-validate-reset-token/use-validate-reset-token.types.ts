export type IValidateResetTokenResponse = {
  message: string;
  data: {
    is_valid: boolean;
  };
  timestamp: string;
};

export type IValidateResetTokenReqBody = {
  email: string;
  token: string;
};
