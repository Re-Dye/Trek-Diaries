'use client'
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function Home() {
    const router = useRouter()
    const session = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        }
    })
    console.log(session)

    const handleSignOut = async() => {
        const data = await signOut({ redirect: false, callbackUrl: '/login'})
        router.push(data.url)
    }
    
    return (
        <div>
            {(session.status === "authenticated") ? 
                <>
                    <h1>Log in successful.</h1>
                    <button onClick={ handleSignOut }>Log out</button>
                </> :
                <h1>This is home page</h1>
            }
        </div>
    )
}