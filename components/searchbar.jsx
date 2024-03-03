"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import ProductCard from "./productCard";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
   
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <form className=" col-span-full max-w-md" onSubmit={handleSearch}>
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
    </>
  );
};

export default SearchBar;
