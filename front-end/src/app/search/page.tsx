'use client'

import { useSearchParams } from "next/navigation"

export default function SearchPage() {
    const searchParams = useSearchParams()
    const searchQuery = searchParams? searchParams?.get('q') : null

    console.log(searchQuery)

    return (
        <div>
            This is the search page.
        </div>
    )
}