'use client'

import { useSearchParams } from "next/navigation"
import Modal from "./components/modal/modal";

export default function SearchPage() {
    const searchParams = useSearchParams()
    const searchQuery = searchParams? searchParams?.get('q') : null

    console.log(searchQuery)

    return (
        <div>
            <Modal />
            This is the search page.
        </div>
    )
}