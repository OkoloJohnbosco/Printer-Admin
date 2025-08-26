import { NextAuthOptions } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],

  callbacks: {
    session: ({ session, token, user }) => {
      console.log("user", { user });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      console.log({ token, user, account, profile, isNewUser });
      if (user) {
        token.user = {
          id: user.id,
          image: user.id,
          email: user.email,
          name: user.name,
        };
        return token;
      }
      return token;
      // Access token has expired, try to update it
    },
  },
} satisfies NextAuthOptions;
