'use client'

import { useSearchParams } from "next/navigation"

import AddLocation from "./components/modal/AddLocation";

import { Suspense, useEffect } from 'react'

import Loading from "./loading"

async function fetchLoactions(searchQuery: string) {
    // const locations = await MongoDBDataApi.aggregate({
    //     dataSource: 'Cluster1',
    //     database: 'Trek-Diaries',
    //     collection: 'locations',
    //     pipeline: [
    //         { $search: { autocomplete: { query: searchQuery, path: 'address' } } },
    //         { $limit: 20 },
    //         { $project: { _id: 1, address: 1, description: 1 } }
    //     ]
    // })
}


export default function SearchPage() {
    const searchParams = useSearchParams()
    const searchQuery = searchParams? searchParams?.get('q') : null

    useEffect(() => {
        console.log(searchQuery)
    }, [])
    

    return (
        <div>
            <AddLocation />
            This is the search page.
            <Suspense fallback={<Loading />}>

            </Suspense>
        </div>
    )
}