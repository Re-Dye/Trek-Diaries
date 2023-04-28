'use client'

import { useSearchParams } from "next/navigation"

import AddLocation from "./components/modal/AddLocation";

import React, { Suspense, useEffect, useState } from 'react'

import Loading from "./loading"
import Location from "./components/location/location";

interface Location {
    _id: string;
    address: string;
    description: string;
}

/**
 * 
 * @param searchQuery string to search in database
 * @param page page number of result
 * @param searchTime time the search page loaded
 * @returns Response
 */
async function fetchLoactions(searchQuery: string, page: number, searchTime: Date) {
    const encodedQuery = encodeURI(searchQuery)
    const encodedPage = encodeURI(page.toString())
    const encodedSearchTime = encodeURI(searchTime.toISOString())
    const res: Response = await fetch(
        `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/searchLocation?location=${ encodedQuery }&page=${ encodedPage }&searchTime=${ encodedSearchTime }`,
        { cache: "no-store" }
    )
    return res.json()
}


export default function SearchPage() {
    const searchParams = useSearchParams()
    const searchQuery = searchParams? searchParams?.get('q') : null
    const [page, setPage] = useState<number>(0)
    const [locations, setLocations] = useState<Array<Location>>([])
    const [searchTime, setSearchTime] = useState<Date>(new Date())

    useEffect(() => {
        try{
            const fetchData = async() => {
                const locations: Array<Location> = await fetchLoactions(searchQuery as string, page, searchTime)
                console.log(locations)
                setLocations(locations)
            }
            fetchData()
        }catch(error){
            console.error(error)
            alert(error)
        }
    }, [])
    

    return (
        <div>
            <AddLocation />
            <Location />
        </div>
    )
}