"use client";

import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import ProductCard from "./productCard";

const SearchBar = ({ setSearchQuery, searchQuery }) => {
  // const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchInputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(searchInputRef.current.value)}`);
    setSearchQuery(searchInputRef.current.value)
    
  };

  return (
    <>
      <form
        className=" col-span-full max-w-md"
        onSubmit={(e) => handleSearch(e)}
      >
        <Input
          type="text"
          placeholder="Search products..."
          ref={searchInputRef}
        />
      </form>
    </>
  );
};

export default SearchBar;
