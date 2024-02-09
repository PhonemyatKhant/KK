import { Button } from "@/components/ui/button";
import Link from "next/link";

import React from "react";

const page = () => {
  return (
    <div className="container flex justify-between mt-4">
      <h1 className="text-2xl">Products</h1>
      <Link href="/admin-products/create-product">
        <Button variant="ghost">Create Product</Button>
      </Link>
    </div>
  );
};

export default page;
