"use client";
import { getAlgoliaApiKey, getAlgoliaAppId } from "@/lib/secrets";
import {
  InstantSearch,
  SearchBox,
  InfiniteHits,
  Pagination,
} from "react-instantsearch";
import algoliasearch from "algoliasearch/lite";
import React from "react";

type SetInstantSearchUiStateOptions = {
  query: string;
};

const appId = getAlgoliaAppId();
const apiKey = getAlgoliaApiKey();
const searchClient = algoliasearch(appId, apiKey);

function Hit({ hit }: any) {
  console.log(hit);
  return <div>{hit.name}</div>;
}

export default function DemoPage() {
  return (
    <div className="flex justify-center h-screen">
    <InstantSearch searchClient={searchClient} indexName="locations" future={{preserveSharedStateOnUnmount: true}}>
        <SearchBox
          classNames={{
            input: "text-center shadow-md",
            form: "flex justify-center items-center w-96 gap-2",
          }}

        />
        <InfiniteHits hitComponent={Hit} />
        <Pagination />
      </InstantSearch>
    </div>
  );
}
