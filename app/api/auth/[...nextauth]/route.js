import User from "@/models/userModel";
import { connectDB } from "@/utils/db";
import NextAuth from "next-auth/next";
import GoogleProvier from 'next-auth/providers/google';


const authOptions = {
    providers: [
        GoogleProvier({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === 'google') {
                const { name, email } = user
                await connectDB()
                const userExist = await User.findOne({ email })
                if (!userExist) {
                    try {
                        const res = await fetch('http://localhost:3000/api/user', {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ name, email })
                        })
                        if (res.ok) {
                            return user
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }

            }
            return user
        }
    }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }