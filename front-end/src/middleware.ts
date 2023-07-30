import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req: NextRequest) {
    console.log('using middleware...')
    const token = await getToken({ req })
    console.log("Auth Token: ", token)
    const isAuth = !!token
    const isAuthPage = req.nextUrl.basePath.startsWith('/login') || req.nextUrl.basePath.startsWith('/sign_up')
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

      return NextResponse.rewrite(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }
  },
  {
    secret: "mysecret",
    callbacks: {
      authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      }
    }

  },
)


export const config = { matcher: [ 
  "/((?!_next/static|favicon.ico).*)", 
  "/", 
  "/login",
  "/sign_up",
  "/reset-password",
  "/location/:path*", 
  "/search", 
  "/reset-passowrd"
] }

