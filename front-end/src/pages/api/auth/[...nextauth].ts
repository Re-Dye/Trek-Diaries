import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongoDB";
import dbConnect from "../../../../lib/mongoose"
import User from "../../../../lib/modals/User"

if (!process.env.NEXTAUTH_SECRET) {
    throw new Error('Please provide process.env.NEXTAUTH_SECRET env variable.')
}

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            
          }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password'}
                
            },
            async authorize(credentials) {
                try {
                    await dbConnect(); // establishing connection to mongoDB
                    const { email, password } = credentials as any
                    console.log(`Entered email:${ email }\npassword: ${ password }`)

                    /* check on database here */
                    const result:any = await User.findOne({email:email})   //checking if the user exists                                                    
                   if(!result) //if the email is unregistered...
                   {
                    console.log("There is no user registered under this email....")
                    return null;
                   }
                   
                   if(password !== result.password) // if password is incorrect
                   {
                    console.log(`Password Incorrect....`)
                    return null;
                   }

                    console.log(`returning user details: ${result}`) // result is MongoDB Object here.. might need to change into js object later...
                    return result;
                } catch {
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)