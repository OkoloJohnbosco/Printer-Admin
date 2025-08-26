import axios, { AxiosResponse } from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const data = {
          email: credentials?.email,
          password: credentials?.password,
        };

        try {
          const response: AxiosResponse<
            CredentialsServerResponseModel<IAuthUserSigninResponse>
          > = await axios.post(`${"ENDPOINTS.API_BASE_URL"}auth/login`, data, {
            headers: {
              "X-API-KEY": "8d0280ab095ae9271f146686873c72d9",
            },
          });
          console.log(response, "response");
          return {
            id: response.data.data.id,
            email: response.data.data.email,
            name: response.data.data.full_name,
          };
        } catch (err: unknown) {
          console.log(err);
          if (err instanceof Error) {
            throw new Error(err.message, {
              cause: err,
            });
          }
          // throw new Error(JSON.stringify({ errors: err, status: false }));
          throw new Error("Authorization failed");
        }
      },
    }),
  ],
});

export interface IAuthUserSigninResponse {
  id: string;
  full_name: string;
  phone_number: string;
  email: string;
}

export type CredentialsServerResponseModel<T> = {
  data: T;
  status: string;
  message: string;
};
