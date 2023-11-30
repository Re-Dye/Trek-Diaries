import { User } from "next-auth"
import { JWT } from "next-auth/jwt"
import { Prettify } from "@/lib/prettify"

type UserId = string

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId,
    dob: string
  }
}

declare module "next-auth" {
  interface Session {
    user: Prettify<User & {
      id: UserId;
      dob: string;
    }>
  }
}