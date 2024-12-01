import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { Buffer } from "buffer"; // If you need to encode credentials
import prisma from "./utils/db";
// Define Spotify scopes
const scope =
  "user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: scope,
        },
      },
    }),
  ],
  secret:process.env.AUTH_SECRET,
  pages: {
    signIn: "/login", // Custom sign-in page
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;
        token.expires_at = Date.now() + (account.expires_at || 3600) * 1000; // Adjust expiration
        token.refresh_token = account.refresh_token || "";
      }
      

      if (Date.now() < token.expires_at*1000) {
        return token;
      }
      // Refresh token logic
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64"),
          },
          body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: token.refresh_token,
          }),
        });

        const refreshedTokens = await response.json();

        if (!response.ok) throw refreshedTokens;

        token.access_token = refreshedTokens.access_token;
        token.expires_at = Date.now() + refreshedTokens.expires_in * 1000;
        if (refreshedTokens.refresh_token) {
          token.refresh_token = refreshedTokens.refresh_token;
        }
        return token;
      } catch (error) {
        console.error("Error refreshing access token:", error);
        return { ...token, error: "RefreshTokenError" };
      }
    },

    async session({ session, token }) {
      session.user.id = token.id
      session.access_token = token.access_token; // Make access_token available in the session
      session.error = token.error; // Handle errors
      return session;
    },
  },
  secret: process.env.AUTH_SECRET, // Use a secure secret for NextAuth
  session: {
    maxAge: 24 * 60 * 60, // Session duration
    updateAge: 12 * 60 * 60, // Update session duration
  },
  debug: true,
});
