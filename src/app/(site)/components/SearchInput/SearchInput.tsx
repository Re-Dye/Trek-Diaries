"use client";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
// import algoliasearch from "algoliasearch/lite";
// import { getAlgoliaApiKey, getAlgoliaAppId } from "@/lib/secrets";

// const searchClient = algoliasearch(getAlgoliaAppId(), getAlgoliaApiKey());

export default function SearchInput() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();

    /* encode the search query to uri */
    const encodedQuery = encodeURI(searchQuery);

    router.push(`/search?q=${encodedQuery}`);

    if (pathname.includes("/search")) {
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex justify-center items-center w-48 gap-1 sm:w-72 md:w-96 md:gap-2"
    >
      <Input
        className="text-center shadow-md border border-gray-800 dark:border-gray-500 rounded-lg"
        placeholder="Search Location"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="submit"
        className="flex w-6 h-6 justify-center items-center hover:text-indigo-400 cursor-pointer"
      >
        <Search />
      </button>
    </form>
  );
}
