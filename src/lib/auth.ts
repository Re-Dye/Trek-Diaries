import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db/db";
import { loginSchema } from "@/lib/zodSchema/login";
import { findUser } from "./db/actions";
import { compare } from "bcryptjs"

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("Please provide process.env.NEXTAUTH_SECRET env variable.");
}

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = loginSchema.parse(credentials); // validating the credentials

          /* check on database here */
          const result = await findUser(email);

          if (!result) {
            //if the email is unregistered...
            return null;
          }

          const isMatch = await compare(password, result.password);

          if (!isMatch) {
            // if password is incorrect
            return null;
          }

          return {
            id: result.id,
            name: result.name,
            email: result.email,
            dob: result.dob,
            picture: result.image
          }
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.dob = token.dob;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      const result = await findUser(token.email!);

      if (!result) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: result.id,
        name: result.name,
        email: result.email,
        picture: result.image,
        dob: result.dob,
      };
    },
  },
};