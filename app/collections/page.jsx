"use client";

import Paginations from "@/components/Paginations";

import Sidebar from "@/components/Sidebar";
import ProductCard from "@/components/productCard";
import SearchBar from "@/components/searchbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../redux/slices/filterSlice";

export async function getProducts() {
  const apiEndpoint = process.env.API_ENDPOINT;

  const res = await fetch(`http://localhost:3000/api/products`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  const { products, page, pages } = data;

  return products;
}
export const getUniqueValues = (productsArray) => {
  const categories = new Set();
  const brands = new Set();
  let maxPrice = productsArray[0].price;

  for (const product of productsArray) {
    if (product.category) {
      categories.add(product.category);
    }
    if (product.brand) {
      brands.add(product.brand);
    }
    if (product.price > maxPrice) {
      maxPrice = product.price;
    }
  }

  const p = {};
  p.categoryOptions = [...categories];
  p.brandOptions = [...brands];
  p.maxPrice = maxPrice;

  return p;
};

const CollectionPage = ({ searchParams }) => {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState();
  const [searchQuery, setSearchQuery] = useState(searchParams.query || "");
  const [sideBarValues, setSideBarValues] = useState({
    categoryOptions: [],
    brandOptions: [],
    maxPrice: 0,
  });
  const [filterQuery, setFilterQuery] = useState({
    viewOutOfStock: false,
    brand: "",
    category: "",
    price: 0,
  });
  const { page } = useSelector((state) => state.pagination);
  // const dispatch = useDispatch()

  // const resetFilterHandler = async () => {
  //   dispatch(resetFilter());
  // };

  // resetFilterHandler();

  useEffect(() => {
    const allProducts = async () => {
      const pageNumber = page;

      const res = await fetch(
        `http://localhost:3000/api/products?p=${pageNumber}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const { products, pages } = await res.json();

      setProducts(products);
      //get buttons
      if (products.length !== 0) {
        const { categoryOptions, brandOptions, maxPrice } =
          getUniqueValues(products);
        setSideBarValues({ categoryOptions, brandOptions, maxPrice });
        // console.log(maxPrice);
      }

      setPages(pages);
      return products;
    };
    allProducts();
  }, [page]);

  return (
    <div className="container gap-5 flex mx-auto px-4">
      {products.length !== 0 && (
        <Sidebar
          categoryOptions={sideBarValues.categoryOptions}
          brandOptions={sideBarValues.brandOptions}
          maxPrice={sideBarValues.maxPrice}
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
        />
      )}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center pt-5">
        <SearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
        <Paginations pages={pages} />
      </div>
    </div>
  );
};

export default CollectionPage;
