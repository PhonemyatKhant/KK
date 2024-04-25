import User from "@/models/userModel";
import { connectDB } from "@/utils/db";
import NextAuth from "next-auth/next";
import GoogleProvier from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";


const authOptions = {
    providers: [
        GoogleProvier({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({

            name: "Credentials",

            credentials: {
                email: { label: "Email", placeholder: "admin@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                const user = {
                    id: "65be47b0cc0af80589e50e0epmk",
                    name: "PhonemyatKhant",
                    password: "12345",
                    email: "phonemyatkhant46@gmail.com",
                    isAdmin: "true"
                }

                if (credentials.email === "phonemyatkhant46@gmail.com" && credentials.password == "12345") {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {

                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    callbacks: {
        async session({ session }) {
            // store the user id from MongoDB to session
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();

            return session;
        },
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
        },
        // async session({ session, token, user }) {
        //     session.user._id = 111;
        //     return session;
        //   },
    }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }