"use client";
import { getAlgoliaApiKey, getAlgoliaAppId, getAlgoliaIndexName } from "@/lib/secrets";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Loading from "./loading";
import ResultLocation from "./ResultLocation";

export default function Results({ query }: { query: string }) {
  const [locations, setLocations] = useState<Array<any>>([]);
  const { refetch, status } = useQuery({
    queryKey: ["search"],
    queryFn: async () => {
      const algoliasearch = (await import("algoliasearch/lite")).default;
      const appId = getAlgoliaAppId();
      const apiKey = getAlgoliaApiKey();
      const searchClient = algoliasearch(appId, apiKey);
      const indexName = getAlgoliaIndexName();

      const index = searchClient.initIndex(indexName);
      const res = await index.search(query);
      setLocations(res.hits);
      return res;
    },
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
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
    </>
  )
}