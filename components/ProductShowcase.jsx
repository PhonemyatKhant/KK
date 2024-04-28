"use client";
import React, { useEffect, useState } from "react";
import ImageShowcase from "./ImageShowcase";

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
      <ImageShowcase product={newArrivalProducts} title="New Arrivals" message='SEE OUR NEW COLLECTION'/>
      <ImageShowcase product={onSaleProducts} title="Discounts" message='SEE MORE PRODUCTS ON SALE'/>
    </div>
  );
};

export default ProductShowcase;
