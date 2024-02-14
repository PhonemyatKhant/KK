"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";

const ProductDetailsPage = ({ params }) => {
  const router = useRouter();
  const pId = params.productId;

  const [product, setProduct] = useState();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${pId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const productData = await res.json();
        setProduct(productData);
      } catch (error) {
        console.error(error);
        // Handle error appropriately (e.g., redirect to error page)
      }
    };
    getProduct();
  }, [pId]);

  return (
    <>
      <div className="flex flex-start container mt-4">
        <Button variant={"secondary"} onClick={() => router.back()}>
          Back
        </Button>
      </div>
      <div className="container flex flex-col md:flex-row items-center gap-10 mx-auto py-10 max-w-screen-xl">
        <div className="flex-1 container h-96 w-full md:w-1/2">
          <Image
            className="object-fill h-full w-full rounded-lg shadow-md"
            src={product?.image}
            alt={product?.name}
            width={64}
            height={64}
          />
        </div>
        <div className=" container max-h-96 md:w-1/2 space-y-8 flex-1">
          <h1 className="text-2xl font-bold">{product?.name}</h1>
          <p className="text-xl font-semibold text-gray-700 mb-2">
            ${product?.price}
          </p>
          <p className="text-gray-500">
            Status: {product?.countInStock ? "In Stock" : "Out of Stock"}
          </p>
          <div className="flex items-center">
            <label className="mr-2 text-gray-700">Quantity:</label>
            <input
              type="number"
              min={1}
              max={product?.countInStock}
              value={1}
              // onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="px-3 py-2 rounded-md border border-gray-300 shadow-sm"
            />
          </div>
          <Button size="sm" disabled={product?.countInStock === 0}>
            Add to Cart
          </Button>
          <p className="text-gray-500">{product?.description}</p>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
