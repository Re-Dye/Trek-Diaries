"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchBoxStyles from "./page.module.css";

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
    <div className={SearchBoxStyles.container}>
      <form onSubmit={handleSearch} className={SearchBoxStyles.box}>
        <input
          placeholder={`What are you looking for? (Enter in format "place, district/state, country")`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">
          <FaSearch className={SearchBoxStyles.icon} />
        </button>
      </form>
    </div>
  );
}
