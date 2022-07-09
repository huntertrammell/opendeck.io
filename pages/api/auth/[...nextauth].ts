
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import prisma from "../../../lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Session } from "../../../lib/session";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token, user }) {
      const sess: Session = {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };

      return sess;
    },
  },
});
