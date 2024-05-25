"use client";
import React, { useEffect, useState } from "react";
import ImageShowcase from "./ImageShowcase";
import pic from "@/public/assets/fabricspic3.jpg";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

const ProductShowcase = () => {
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const [onSaleProducts, setOnSaleProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/products/bannerProducts`
        );
        const { newArrivals, onSaleItems } = await res.json();

        if (res.ok) {
          setNewArrivalProducts(newArrivals);
          setOnSaleProducts(onSaleItems);
        }
      } catch (error) {
        console.log(error.message);
      }
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
