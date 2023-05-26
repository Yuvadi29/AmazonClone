import NextAuth from 'next-auth';
import Providers from "next-auth/providers";

export const authOptions = {
    // We can configur one or more authentication providers
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        // We can add more providers here
    ],
}

export default NextAuth(authOptions);