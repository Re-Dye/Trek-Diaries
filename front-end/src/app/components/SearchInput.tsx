'use client'
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function SearchInput() {
    const [searchQuery, setSearchQuery] = useState<string>("")
    const router = useRouter()

    const handleSearch = (event: FormEvent) => {
        event.preventDefault()

        /* encode the search query to uri */
        const encodedQuery = encodeURI(searchQuery)

        router.push(`/search?q=${ encodedQuery }`)
    }

    return(
        <div>
            <form onSubmit={ handleSearch }>
                <input 
                    placeholder={ `What are you looking for? (Enter in format "place, district/state, country")` }
                    value={ searchQuery }
                    onChange={ (e) => setSearchQuery(e.target.value) }
                    />
            </form>
        </div>
    )
}