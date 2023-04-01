import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/',
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials as { email: string; password: string }
                console.log(email, password)
                /* if email and password is not given */
                if (!email || !password) {
                    throw new Error("email/password missing!");
                }
                
                //check user information here from database
                if (email=== "john@gmail.com" && password === "johns-password") {
                    return { username: "John", id: "123" };
                }

                throw new Error("username/password do not match!");
            }
        })
    ]
}

export default NextAuth(authOptions)
