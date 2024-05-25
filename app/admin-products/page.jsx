"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getProducts } from "../collections/page";
import React, { useEffect, useState } from "react";

const page = () => {
  const [products, setProducts] = useState();
  useEffect(() => {
    const getAllProducts = async () => {
      const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
      const res = await fetch(`${apiEndpoint}/api/products/admin-products`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const products = await res.json();

      setProducts(products);
    };
    getAllProducts();
  }, []);
  console.log(products);
  return (
    <>
      <div className=" flex justify-between mt-4">
        <h1 className="text-2xl">All Products</h1>
        <Link href="/admin-products/create-product">
          <Button variant="ghost">Create Product</Button>
        </Link>
      </div>

      {products && (
        <div className=" mx-auto py-10">
          <DataTable columns={columns} data={products} />
        </div>
      )}
    </>
  );
};

export default page;
