"use client";

import { useSearchParams } from "next/navigation";

import AddLocation from "./components/modal/AddLocation";

import React, { Suspense, useEffect, useState } from "react";

import Loading from "./loading";

async function fetchLoactions(searchQuery: string) {
  const encodedQuery = encodeURI(searchQuery);
  const res: any = await fetch(
    `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/searchLocation?location=${encodedQuery}`,
    { cache: "no-store" }
  );
  return res.json();
}

type IndividualLocations = {
    _id:String;
    address:String;
    description:String
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams ? searchParams?.get("q") : null;
  const [locations, setLocations] = useState<Array<IndividualLocations>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const locations = await fetchLoactions(searchQuery as string);
      console.log(locations);
      setLocations(locations);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>This is the search page.</h1>
      {locations.map((local) => (
        <h1 key={ local._id }>{local.address}</h1>
      ))}
      <AddLocation />
    </div>
  );
}
