import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req: NextRequest) {
    console.log('using middleware...')
    return NextResponse.rewrite(new URL('/', req.url))
  },
  {
    secret: 'mysecret',
    pages: {
      signIn: "/login"
    },
    callbacks: {
      authorized({ token }) {
        /* if user has a token, let them proceed */
        if (token) {
          console.log(`User ${ token.name } has a token. Proceeding user...`)
          return true
        }else{
          console.log(`User doesn't have a token. Rewriting the url to home page...`)
          return false
        }
      }
    }

  },
)


export const config = { matcher: [ "/((?!_next/static|favicon.ico|login|sign_up|).*)", "/" ] }

