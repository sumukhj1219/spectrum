import NextAuth, { type User } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { Buffer } from "node:buffer";

// Scope for Spotify permissions
const scope =
  "user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative";

const LOGIN_URL = "https://accounts.spotify.com/authorize?";

const getAuthorizationUrl = () => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    redirect_uri: "http://localhost:3000",
    scope: scope,
  });
  return `${LOGIN_URL}${params.toString()}`;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: getAuthorizationUrl(),
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account }) {
        if (account) {
          return {
            ...token,
            access_token: account.access_token,
            expires_at: account.expires_at ? account.expires_at * 1000 : Date.now() + 3600 * 1000, // Default to 1 hour if not provided
            refresh_token: account.refresh_token ?? '', // Use an empty string as fallback
          };
        }else if (Date.now() < Number(token.expires_at) * 1000) {
            return token;
          }
        else {
          if (!token.refresh_token) throw new TypeError("Missing refresh_token");
      
          try {
            const response = await fetch("https://accounts.spotify.com/api/token", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization:
                  "Basic " +
                  Buffer.from(
                    process.env.SPOTIFY_CLIENT_ID! +
                      ":" +
                      process.env.SPOTIFY_CLIENT_SECRET!
                  ).toString("base64"),
              },
              body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: token.refresh_token as string, // Assert the type here
              }),
            });
      
            const tokensOrError = await response.json();
      
            if (!response.ok) throw tokensOrError;
      
            const newTokens = tokensOrError as {
              access_token: string;
              expires_in: number;
              refresh_token?: string;
            };
      
            token.access_token = newTokens.access_token;
            token.expires_at = Math.floor(Date.now() / 1000) + newTokens.expires_in;
            if (newTokens.refresh_token) token.refresh_token = newTokens.refresh_token;
            return token;
          } catch (error) {
            console.error("Error refreshing access_token", error);
            token.error = "RefreshTokenError";
            return token;
          }
        }
      },
      
    async session({ session, token, user }) {
            session.user.id = token.id; // Assign the id to session.user.id
          return session
    },
  },
});

declare module "next-auth" {
    interface Session {
      error?: "RefreshTokenError";
      token:string
      id?:string
      user: {
        id?: string; 
      };
    }
  }
    interface JWT {
      access_token: string;
      expires_at: number;
      refresh_token?: string;
      error?: "RefreshTokenError";
      id?: string; // Optional, based on your logic
    }
  
