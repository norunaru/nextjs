// lib/authOptions.js
import { connectDB } from "../utils/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const githubID = process.env.NEXT_PUBLIC_GITHUB_ID;
const githubPW = process.env.NEXT_PUBLIC_GITHUB_PW;
const githubJWT = process.env.NEXT_PUBLIC_JWT_PW;

export const authOptions = async () => {
  const client = await connectDB;

  return {
    providers: [
      GithubProvider({
        clientId: githubID,
        clientSecret: githubPW,
      }),
      CredentialsProvider({
        name: "credentials",
        credentials: {
          email: { label: "email", type: "text" },
          password: { label: "password", type: "password" },
        },
        async authorize(credentials) {
          const db = (await connectDB).db("nextJS");
          const user = await db
            .collection("user_cred")
            .findOne({ email: credentials.email });
          if (!user) return null;

          const pwcheck = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!pwcheck) return null;

          return user;
        },
      }),
    ],
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
      jwt: async ({ token, user }) => {
        if (user) {
          token.user = {
            name: user.name,
            email: user.email,
          };
        }
        return token;
      },
      session: async ({ session, token }) => {
        session.user = token.user;
        return session;
      },
    },
    secret: githubJWT,
    adapter: MongoDBAdapter(client), // ✅ 요기 수정됨
  };
};
