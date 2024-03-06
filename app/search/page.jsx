"use client";

import React, { useEffect, useState } from "react";
import { getProducts, getUniqueValues } from "../collections/page"; // Adjust path if needed
import SearchBar from "@/components/searchbar";
import ProductCard from "@/components/productCard";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";

const SearchPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarData, setSidebarData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("query");

  useEffect(() => {
    const fetchAllProducts = async () => {
      const products = await getProducts();
      setAllProducts(products);
      setIsLoading(false);
    };

    fetchAllProducts();

    setSearchQuery(initialSearch || "");
  }, [initialSearch]);

  // Move sidebar data handling outside of useEffect
  useEffect(() => {
    if (allProducts.length > 0) {
      const { categoryOptions, brandOptions, maxPrice } =
        getUniqueValues(searchedResults);
      setSidebarData({ categoryOptions, brandOptions, maxPrice });
    }
  }, [allProducts]);
  console.log(sidebarData);
  const filterProducts = (searchtext) => {
    if (!searchtext || searchtext.trim() === "") return [];

    const regex = new RegExp(searchtext, "i");

    const fProducts = allProducts.filter(
      (product) =>
        regex.test(product.name) ||
        regex.test(product.brand) ||
        regex.test(product.category)
    );

    return fProducts;
  };

  const searchedResults = filterProducts(searchQuery);

  return (
    <div className="container gap-5 flex mx-auto px-4">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {sidebarData && (
            <Sidebar
              categoryOptions={sidebarData.categoryOptions}
              brandOptions={sidebarData.brandOptions}
              maxPrice={sidebarData.maxPrice}
              sidebarData={sidebarData}
            />
          )}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center pt-5">
            <SearchBar />
            {searchedResults.length > 0 ? (
              <>
                <h2 className="col-span-full">
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
        </>
      )}
    </div>
  );
};

export default SearchPage;
