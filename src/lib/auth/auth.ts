import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../../../prisma/prisma";
import type { Adapter } from "next-auth/adapters";
import Apple from "next-auth/providers/apple";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: "jwt" },
  providers: [
    Google({
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          subscriptionRole: profile.subscriptionRole || null,
        };
      },
    }),
    Credentials({
      credentials: {
        email: { label: "Email", required: true },
        password: { label: "Senha", type: "password", required: true },
      },
      async authorize({ email, password }) {
        if (
          !email ||
          typeof email !== "string" ||
          !password ||
          typeof password !== "string"
        ) {
          throw new Error("Invalid credentials");
        }
        const user = await prisma.user.findUnique({
          where: { email: email },
        });
        console.log(email, user);
        if (!user) {
          throw new Error("Invalid login");
        }
        const isPasswordValid = await bcrypt.compare(
          password,
          user.password as string
        );
        if (!isPasswordValid) throw new Error("Login ou senha inválidos");
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          subscriptionRole: user.subscriptionRole || null,
        };
      },
    }),
    Apple({
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          subscriptionRole: profile.subscriptionRole || null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.subscriptionRole = user.subscriptionRole || null;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.subscriptionRole = token.subscriptionRole;
      }

      return session;
    },
  },
});
