import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { getAuthSecret } from "../lib/secrets"

const authSecret: string = getAuthSecret()

export default withAuth(
  async function middleware(req: NextRequest) {
    console.log('using middleware...')
    const token = await getToken({ req, secret: authSecret })
    console.log("Auth Token: ", token)
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/sign_up')
    if(isAuthPage){
      if (isAuth){
        return NextResponse.rewrite(new URL('/', req.url))
      }
      return null
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }
  },
  {
    secret: authSecret,
    callbacks: {
      authorized(){ return true }
    }
  }
)


export const config = { matcher: [
  "/", 
  "/login",
  "/sign_up",
  "/reset-password",
  "/location/:path*", 
  "/search", 
  "/reset-passowrd"
] }