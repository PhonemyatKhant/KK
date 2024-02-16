import { Button } from "@/components/ui/button";
import Link from "next/link";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getProducts } from "../collections/page";
import React from "react";

const page = async () => {
  const products = await getProducts();
  return (
    <>
      <div className="container flex justify-between mt-4">
        <h1 className="text-2xl">All Products</h1>
        <Link href="/admin-products/create-product">
          <Button variant="ghost">Create Product</Button>
        </Link>
      </div>

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={products} />
      </div>
    </>
  );
};

export default page;
