"use client";

import { useSearchParams } from "next/navigation";

import AddLocation from "./components/modal/AddLocation";

import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Loading from "./loading";
import ResultLocation from "./components/location/ResultLocation";
import searchStyle from "./page.module.css";

interface Location {
  _id: string;
  address: string;
  description: string;
}

const LOCATIONS_PER_SCROLL = 7;

/**
 *
 * @param searchQuery string to search in database
 * @param page page number of result
 * @param searchTime time the search page loaded
 * @returns Response
 */
async function fetchLocations(
  searchQuery: string,
  page: number,
  searchTime: Date
) {
  const encodedQuery = encodeURI(searchQuery);
  const encodedPage = encodeURI(page.toString());
  const encodedSearchTime = encodeURI(searchTime.toISOString());
  const res: Response = await fetch(
    `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/searchLocation?location=${encodedQuery}&page=${encodedPage}&searchTime=${encodedSearchTime}`,
    { cache: "no-store" }
  );
  return res.json();
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams ? searchParams?.get("q") : "";
  const [locations, fetchData, hasMore, didMount] = useFetchLocations(
    searchQuery as string
  );

  return (
    <div className={searchStyle.wrapper}>
      <div className={searchStyle.left}></div>
      <div className={searchStyle.center}>
        <AddLocation />
        {didMount && (
          <div className={searchStyle.search}>
            {locations.length && (
              <InfiniteScroll
                dataLength={locations.length} //This is important field to render the next data
                next={fetchData as any}
                hasMore={hasMore}
                loader={<Loading />}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                {locations.map((location) => (
                  <ResultLocation
                    key={location._id}
                    id={location._id}
                    address={location.address}
                    description={location.description}
                  />
                ))}
              </InfiniteScroll>
            )}
            {!locations.length && <h1>Not Found!</h1>}
          </div>
        )}
        {!didMount && <Loading />}
      </div>
      <div className={searchStyle.right}></div>
    </div>
  );
}

function useFetchLocations(
  searchQuery: string
): [
  locations: Array<Location>,
  fetchData: Function,
  hasMore: boolean,
  didMount: boolean
] {
  const page = useRef<number>(0);
  const [locations, setLocations] = useState<Array<Location>>([]);
  const searchTime = useRef<Date>(new Date());
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [didMount, setDidMount] = useState<boolean>(false);

  const fetchData = async () => {
    console.log("Fetch called");
    try {
      /* fetch more locations */
      const fetchedLocations: Array<Location> = await fetchLocations(
        searchQuery as string,
        page.current,
        searchTime.current
      );

      /* add the locations to the existing locations */
      setLocations((locations) => [...locations, ...fetchedLocations]);

      /* update page and has more */
      page.current = page.current + 1;
      setHasMore(!(fetchedLocations.length < LOCATIONS_PER_SCROLL));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  /* fetch data once on render */
  useEffect(() => {
    try {
      const fetchData = async () => {
        /* fetch more locations */
        const fetchedLocations: Array<Location> = await fetchLocations(
          searchQuery as string,
          page.current,
          searchTime.current
        );

        /* add the locations to the existing locations */
        setLocations(fetchedLocations);

        /* update page and has more */
        page.current = 1;
        setHasMore(!(fetchedLocations.length < LOCATIONS_PER_SCROLL));
        setDidMount(true);
      };
      fetchData();
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }, [searchQuery]);

  return [locations, fetchData, hasMore, didMount];
}
