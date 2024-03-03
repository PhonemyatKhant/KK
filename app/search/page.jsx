"use client";

import React, { useEffect, useState } from "react";
import { getProducts, getUniqueValues } from "../collections/page"; // Adjust path if needed
import SearchBar from "@/components/searchbar";
import ProductCard from "@/components/productCard";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";

const SearchPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Initial state for search query
  const [sidebarData, setSidebarData] = useState(null);

  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("query"); // Get initial search query from URL

  useEffect(() => {
    const fetchAllProducts = async () => {
      const products = await getProducts();
      setAllProducts(products);
    };

    fetchAllProducts();
    setSearchQuery(initialSearch || ""); // Set initial search query from URL or empty string

    if (searchedResults.length > 0) {
      const { categoryOptions, brandOptions, maxPrice } =
        getUniqueValues(searchedResults);
      setSidebarData({ categoryOptions, brandOptions, maxPrice });
    }
  }, [initialSearch]); // Empty dependency array to fetch products only once

  const filterProducts = (searchtext) => {
    if (!searchtext || searchtext.trim() === "") return []; // Handle empty search

    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search

    const fProducts = allProducts.filter(
      (product) =>
        regex.test(product.name) ||
        regex.test(product.brand) ||
        regex.test(product.category)
    );

    return fProducts;
  };

  const searchedResults = filterProducts(searchQuery);

  console.log(searchedResults.length);

  return (
    <div className="container gap-5 flex mx-auto px-4">
      {sidebarData ? (
        <Sidebar
          categoryOptions={sidebarData.categoryOptions}
          brandOptions={sidebarData.brandOptions}
          maxPrice={sidebarData.maxPrice}
        />
      ) : (
        <></>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center pt-5">
        <SearchBar />
        {searchedResults.length > 0 ? (
          <>
            <h2 className=" col-span-full max-h-0.5">
              Search results for: "{searchQuery}"
            </h2>
            {searchedResults.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </>
        ) : (
          <p>No results found for your search.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
