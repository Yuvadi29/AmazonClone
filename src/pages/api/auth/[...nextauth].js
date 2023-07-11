import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from "@/src/db";


export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    // We can configur one or more authentication providers
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        // We can add more providers here
    ],

}

export default NextAuth(authOptions);