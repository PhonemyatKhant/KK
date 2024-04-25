import React from "react";
import ProductCard from "./productCard";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const ImageShowcase = ({ product, title, message }) => {
  console.log(product);
  return (
    <div>
      <h1 className=" text-3xl font-semibold my-3">{title} </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center pt-5">
        {product.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
      <div className="flex">
        {" "}
        <Link className="mx-auto my-4" href="/collections">
          {" "}
          <Button  >
            {message} <ArrowUpRight />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ImageShowcase;
