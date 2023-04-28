'use client'

import { useSearchParams } from "next/navigation"

import AddLocation from "./components/modal/AddLocation";

import React, { Suspense, useEffect, useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";

import Loading from "./loading"
import ResultLocation from "./components/location/ResultLocation"

interface Location {
    _id: string;
    address: string;
    description: string;
}

const LOCATIONS_PER_SCROLL = 7

/**
 * 
 * @param searchQuery string to search in database
 * @param page page number of result
 * @param searchTime time the search page loaded
 * @returns Response
 */
async function fetchLocations(searchQuery: string, page: number, searchTime: Date) {
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
    const searchQuery = searchParams? searchParams?.get('q') : ""
    const [page, setPage] = useState<number>(0)
    const [locations, setLocations] = useState<Array<Location>>([])
    const [searchTime, setSearchTime] = useState<Date>(new Date())
    const [hasMore, setHasMore] = useState<boolean>(true)

    const fetchData = async() => {
        console.log("Fetch called")
        try{
            const fetchedLocations: Array<Location> = await fetchLocations(searchQuery as string, page, searchTime)
            console.log(fetchedLocations.length)
            setLocations((locations) => [...locations, ...fetchedLocations])
            setPage((page) => page + 1)

            if(fetchedLocations.length < 7) {
                setHasMore(false)
            }else{
                setHasMore(true)
            }
        }catch(error){
            console.error(error)
            alert(error)
        }
    }

    // useEffect(() => {
    //     fetchData()
    // }, [])

    return (
        <div>
            <AddLocation />
            <InfiniteScroll
                dataLength={ locations.length } //This is important field to render the next data
                next={ fetchData }
                hasMore={ hasMore }
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {
                    locations.map((location) => (
                        <ResultLocation
                            key={ location._id }
                            id={ location._id }
                            address={ location.address }
                            description={ location.description }
                        />
                    ))
                }
            </InfiniteScroll>
        </div>
    )
}