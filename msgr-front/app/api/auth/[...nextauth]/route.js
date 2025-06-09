import { SERVICEBASEURL } from "@/lib/api/http";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${SERVICEBASEURL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          // Check if login was successful
          if (res.ok && data?.user) {
            return {
              id: data.user._id,
              name: data.user.name,
              email: data.user.email,
              profilePhoto: data.user.profilePhoto,
              role: data.user.role?.name,
              accessToken: data.token,
            };
          }

          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // On initial sign in
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.profilePhoto = user.profilePhoto;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }

      // On client-side `update()` call
      if (trigger === "update" && session) {
        token.name = session.user.name;
        token.email = session.user.email;
        token.profilePhoto = session.user.profilePhoto;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.profilePhoto = token.profilePhoto;
      session.user.role = token.role;
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
