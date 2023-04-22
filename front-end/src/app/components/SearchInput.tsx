"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchInput() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();

    /* encode the search query to uri */
    const encodedQuery = encodeURI(searchQuery);

    router.push(`/search?q=${encodedQuery}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <FaSearch />
        <input
          placeholder={`What are you looking for? (Enter in format "place, district/state, country")`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
    </div>
  );
}
