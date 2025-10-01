export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  is_admin: boolean;
  buyer_type: string;
  seller_type: string;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface ILoginResponse {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
  timestamp: string;
}

export type ILoginReqBody = {
  email: string;
  password: string;
};
