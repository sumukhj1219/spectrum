import { LOGIN_URL } from "@/utils/spotify";
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi from "@/utils/spotify";

async function refreshAccessToken(token){
    try {
        spotifyApi.setAccessToken(token.accessToken)
        spotifyApi.setRefreshToken(token.setRefreshToken)

        const {body: refreshedToken} = await spotifyApi.refreshAccessToken()
        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken
        }
    } catch (error) {
        console.log(error)

        return {
            ...token,
            error:"Refresh access token error"
        }
    }
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers:[
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            authorization: {LOGIN_URL, redirect_uri: process.env.NEXTAUTH_URL + '/api/auth/callback/spotify'}

        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/login"
    },
    callbacks:{
        async jwt({token , account, user})
        {
            if(account && user)
            {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at*1000
                }
            }

            if(Date.now() < token.accessToken)
            {
                return token
            }

            return await refreshAccessToken(token)
        }
    },
    async session({session,  token}){
        session.user.accessToken = token.accessToken
        session.user.refreshToken = token.refreshToken
        session.user.username = token.username

        return session
    }
})