import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { useRouter } from "next/dist/client/router";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "my-project",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials, req) {
        const payload = {
          email: "a@gmail.com",
          password: "1234",
        };

        if (
          payload.email === credentials.email &&
          payload.password === credentials.password
        )
          return {
            id: 2,
            email: "a@gmail.com",
          };
        return null;
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  //   pages: {
  //     signIn: "/auth/dummylogin",
  //   },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.data.token,
          refreshToken: user.data.refreshToken,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;

      return session;
    },
  },
  theme: {
    colorScheme: "dark", // "auto" | "dark" | "light"
    brandColor: "#33FF5D", // Hex color code #33FF5D
    logo: "/logo.png", // Absolute URL to image
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
});
