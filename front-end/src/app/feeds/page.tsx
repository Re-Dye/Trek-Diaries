'use client'
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Feeds() {
    const router = useRouter()

    const handleSignOut = async() => {
        const data = await signOut({ redirect: false, callbackUrl: '/login'})
        router.push(data.url)
    }

    return (
        <div>
            <h1>Log in successful.</h1>
            <button onClick={ handleSignOut }>Log out</button>
        </div>
    )
}