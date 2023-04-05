import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongo-handler";

export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials as { email: string, password: string }
                
                /* check on database here */
                if (email !== 'hridaya@gmail.com' || password !== '1234') {
                    return null
                }

                /* return user info */
                return {
                    id: '1234',
                    name: 'Hridaya',
                    email: 'hridaya@gmail.com',
                    role: 'user'
                }
            }
        })
    ],
    pages: {
        signIn: "/login"
    },
})










// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// const authOptions: NextAuthOptions = {
//     session: {
//         strategy: 'jwt'
//     },
//     pages: {
//         signIn: '/',
//     },
//     providers: [
//         CredentialsProvider({
//             type: 'credentials',
//             credentials: {},
//             async authorize(credentials, req) {
//                 const { email, password } = credentials as { email: string; password: string }
//                 const res = await fetch((process.env.LOGIN_URL as string), {
//                     method: 'POST',
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify({ email, password })
//                 })
//                 console.log(email, password)

//                 const user = await res.json();

//                 if (res.ok && user) {
//                     return user
//                 }else{
//                     return null
//                 }
//             }
//         })
//     ],
//     secret: process.env.NEXTAUTH_SECRET
// }

// export default NextAuth(authOptions)
