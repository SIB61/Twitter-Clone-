import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {},
      authorize(credentials, req) {
        const { email, password } = credentials;
        console.log(email,password)
        if (email !== "sabit41@gmail.com" || password !== "12345678") {
          throw new Error("invalid credentials");
        }

        return {
          id: "1234",
          name: "John Doe",
          email: "john@gmail.com",
          role: "admin",
          isComplete: "false",
          accessToken: "kffsgsgs.jgsjgbsjg.jksgkjg",
        };
      },
    }),
  ],

  pages: {
    signIn: "/",
  },

  callbacks: {
    async session({ session, token, params }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.isComplete = token.isComplete;
      session.user.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        token.role = user?.role || "user";
        token.isComplete = user?.isComplete || false;
        token.accessToken = user?.accessToken || "";
      }
      if (account) {
        // token.accessToken = account.access_token;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
