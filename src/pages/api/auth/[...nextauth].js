import UserModel from "@/core/schemas/user.schema";
import { dbConnect } from "@/core/utils/db";
import { getUserByEmail } from "@/features/user/services/server/get-user";
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
    async jwt({token,user,account}) {
      console.log(account,user,token)
      if (user) {
        user = await getUserByEmail(token.email)
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
        token.email = user.email;
        token.image = user.image
      }
      return token;
    },

    async session({ session, token, params }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.image = token.image
      return session;
    },

    async signIn({ user, account}) {
      if (account) {
        try{
        const { email, name, image } = user;
        await dbConnect();
        const existingUser = await getUserByEmail(email);
        if (!existingUser) {
           await UserModel.create({
            username: email.split("@")[0],
            email,
            name,
            image
          });
        }
        }
        catch(err){
          return false
        }
      }
      return true
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
