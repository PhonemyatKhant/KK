"use client";
import React, { useEffect, useState } from "react";
import ImageShowcase from "./ImageShowcase";
import pic from "@/public/assets/fabricspic3.jpg";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const ProductShowcase = () => {
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const [onSaleProducts, setOnSaleProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch(
        `http://localhost:3000/api/products/bannerProducts`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const { newArrivals, onSaleItems } = await res.json();
      //   console.log(newArrivals);

      setNewArrivalProducts(newArrivals);
      setOnSaleProducts(onSaleItems);
    };
    getProducts();
  }, []);
  return (
    <div className="mb-6">
      <ImageShowcase
        product={newArrivalProducts}
        title="New Arrivals"  
        message="SEE OUR NEW COLLECTION"
      />
      <div className="grid border rounded-md my-6 max-sm:grid-cols-1 grid-cols-2 items-center">
        <div className=" col-span-1 ">
          <Image
            src={pic}
            alt="fabrics"
            className="w-full h-96 object-cover block rounded-l-md"
          />
        </div>
        <div className="  p-5">
          <h1 className="  font-thin italic text-4xl text-wrap">
            "Elevate your creations with our exquisite selection of premium
            quality fabrics, meticulously curated to inspire your next
            masterpiece."
          </h1>
          <Link href="/collections">
            <Button className="p-0 font-semibold " variant="link">
              EXPLORE COLLECTIONS
            </Button>
          </Link>
        </div>
      </div>
      <ImageShowcase
        product={onSaleProducts}
        title="Discounts"
        message="SEE MORE PRODUCTS ON SALE"
      />
    </div>
  );
};

export default ProductShowcase;
