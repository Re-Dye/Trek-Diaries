"use client";

import { useSearchParams } from "next/navigation";

import AddLocation from "./components/modal/AddLocation";

import React, { useEffect, useState } from "react";

import Loading from "./loading";
import ResultLocation from "./components/location/ResultLocation";
import { getAlgoliaApiKey, getAlgoliaAppId } from "@/lib/secrets";
import { useQuery } from "@tanstack/react-query";


export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams ? searchParams?.get("q") : "";
  const [locations, setLocations] = useState<Array<any>>([]);
  const { refetch, status } = useQuery({
    queryKey: ["search"],
    queryFn: async () => {
      const algoliasearch = (await import("algoliasearch/lite")).default;
      const appId = getAlgoliaAppId();
      const apiKey = getAlgoliaApiKey();
      const searchClient = algoliasearch(appId, apiKey);

      const index = searchClient.initIndex("locations");
      const res = await index.search(searchQuery as string);
      setLocations(res.hits);
      return res;
    },
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <div className="flex justify-between h-screen">
      <div className="w-1/4 bg-custom_gray mt-2 border"></div>
      <div className="mt-2 bg-custom_gray border w-2/4 box-border space-y-2">
        <div className="flex justify-center mt-3">
          <AddLocation />
        </div>
        {/* {didMount && (
          <div>
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
        {!didMount && <Loading />} */}
        {status === "pending" ? (
          <Loading />
        ) : (
          locations.map((location) => (
            <ResultLocation
              key={location.objectID}
              id={location.objectID}
              address={location.address}
              description={location.description}
            />
          ))
        )}
        {(!locations.length && status === "success") && <h1>Not Found!</h1>}
      </div>
      <div className="w-1/5 bg-custom_gray border mt-2"></div>
    </div>
  );
}

// function useFetchLocations(
//   searchQuery: string
// ): [
//   locations: Array<Location>,
//   fetchData: Function,
//   hasMore: boolean,
//   didMount: boolean
// ] {
//   const page = useRef<number>(0);
//   const [locations, setLocations] = useState<Array<Location>>([]);
//   const searchTime = useRef<Date>(new Date());
//   const [hasMore, setHasMore] = useState<boolean>(true);
//   const [didMount, setDidMount] = useState<boolean>(false);

//   const fetchData = async () => {
//     console.log("Fetch called");
//     try {
//       /* fetch more locations */
//       const fetchedLocations: Array<Location> = await fetchLocations(
//         searchQuery as string,
//         page.current,
//         searchTime.current
//       );

//       /* add the locations to the existing locations */
//       setLocations((locations) => [...locations, ...fetchedLocations]);

//       /* update page and has more */
//       page.current = page.current + 1;
//       setHasMore(!(fetchedLocations.length < LOCATIONS_PER_SCROLL));
//     } catch (error) {
//       console.error(error);
//       alert(error);
//     }
//   };

//   /* fetch data once on render */
//   useEffect(() => {
//     try {
//       const fetchData = async () => {
//         /* fetch more locations */
//         const fetchedLocations: Array<Location> = await fetchLocations(
//           searchQuery as string,
//           page.current,
//           searchTime.current
//         );

//         /* add the locations to the existing locations */
//         setLocations(fetchedLocations);

//         /* update page and has more */
//         page.current = 1;
//         setHasMore(!(fetchedLocations.length < LOCATIONS_PER_SCROLL));
//         setDidMount(true);
//       };
//       fetchData();
//     } catch (error) {
//       alert(error);
//       console.error(error);
//     }
//   }, [searchQuery]);

//   return [locations, fetchData, hasMore, didMount];
// }
