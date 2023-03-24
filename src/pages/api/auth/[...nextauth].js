import UserModel from "@/core/schemas/user.schema";
import { dbConnect } from "@/core/utils/db";
import { login } from "@/features/user/services/server/login";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        await dbConnect();
        const { email, password } = credentials;
        try {
          const user = await login({ email, password });
          return user;
        } catch (err) {
          throw err;
        }
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  pages: {
    signIn: "/?page=login",
  },

  callbacks: {
    async session({ session, token, params }) {
      session.user.userId = token.userId;
      session.user.name = token.name;
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.userId = user.userId;
        token.name = user.name;
        token.username = user.username;
        token.email = user.email;
        token.accessToken = user?.accessToken || "";
      }
      if (account) {
        // token.accessToken = account.access_token;
      }
      return token;
    },

    async signIn(user, account, profile) {
      const { email, name, image } = user;
      console.log('sign in middle')
      // await dbConnect()
      // const existingUser = UserModel.findOne({email:email})
      // console.log("sign in next auth") 
      // if (!existingUser) {
      //   await UserModel.create({
      //     username:email.slice("@")[0],
      //     email:email,
      //     name:name,
      //     profileUrl: image,
      //   });
      // }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
