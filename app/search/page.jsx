"use client";

import React, { useEffect, useState } from "react";
import { getProducts, getUniqueValues } from "../collections/page"; // Adjust path if needed
import SearchBar from "@/components/searchbar";
import ProductCard from "@/components/productCard";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Paginations from "@/components/Paginations";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSelector } from "react-redux";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { FaSlidersH } from "react-icons/fa";

const SearchPage = ({ searchParams }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.query);

  const { viewOutOfStock, brand, category } = useSelector(
    (state) => state.filter
  );
  console.log(category);
  const [pages, setPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  const [sideBarValues, setSideBarValues] = useState({
    categoryOptions: [],
    brandOptions: [],
    maxPrice: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSearchQuery(searchParams.query);
    const allProducts = async () => {
      const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
      const res = await fetch(
        `${apiEndpoint}/api/products/search?query=${searchParams.query}&p=${pageNumber}&viewOOS=${viewOutOfStock}&brand=${brand}&category=${category}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch searched product");
      }

      const { products, pages } = await res.json();

      setAllProducts(products);
      //get buttons
      if (products.length !== 0) {
        const { categoryOptions, brandOptions, maxPrice } =
          getUniqueValues(products);
        setSideBarValues({ categoryOptions, brandOptions, maxPrice });
      }

      setPages(pages);
      setIsLoading(false);

      return products;
    };
    allProducts();
  }, [searchParams.query, pageNumber, viewOutOfStock, brand, category]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center pt-5">
          <div className=" text-sm col-span-full max-w-[100px]">
            <Sheet>
              <SheetTrigger>
                <span className="flex items-center gap-2">
                  <FaSlidersH />
                  filter
                </span>
              </SheetTrigger>
              {allProducts.length !== 0 && (
                <Sidebar
                  categoryOptions={sideBarValues.categoryOptions}
                  brandOptions={sideBarValues.brandOptions}
                  maxPrice={sideBarValues.maxPrice}
                  sidebarData={sideBarValues}
                />
              )}
            </Sheet>
          </div>
          <SearchBar
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />
          {allProducts.length > 0 ? (
            <>
              <h2 className="col-span-full">
                Search results for: "{searchQuery}"
              </h2>
              {allProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </>
          ) : (
            <p>No results found for your search.</p>
          )}
          {/* <Paginations pages={pages} /> */}
          <Pagination className="col-span-full mb-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPageNumber((prev) => (prev -= 1))}
                />
              </PaginationItem>
              <PaginationItem>
                {Array.from({ length: pages }).map((_, index) => (
                  <PaginationLink
                    key={index}
                    onClick={() => setPageNumber(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                ))}
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPageNumber((prev) => (prev += 1))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
    // <h1> {`The serach query is ${searchParams.query} and filter is ${searchParams.filter}`} </h1>
  );
};

export default SearchPage;
