"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";

import { addToCart } from "@/app/redux/slices/cartSlice";
import { useDispatch } from "react-redux";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { logging } from "@/next.config";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { ToastAction } from "@radix-ui/react-toast";
import RateAndReview from "@/components/RateAndReview";
import AllReviews from "@/components/AllReviews";
import Rating from "@/components/Rating";

const ProductDetailsPage = ({ params }) => {
  const router = useRouter();
  const pId = params.productId;
  const dispatch = useDispatch();

  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
      try {
        const res = await fetch(`${apiEndpoint}/api/products/${pId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const productData = await res.json();
        setProduct(productData);
      } catch (error) {
        console.error(error);
        // Handle error redirect
      }
    };
    getProduct();
  }, [pId]);
  let overallRating;
  if (product) {
    const reviews = product.reviews;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    overallRating = sum / product.reviews.length;
    // console.log(overallRating);
  }

  const addToCartHandler = () => {
    const initialState = localStorage.getItem("cartItems")
      ? { cartItems: JSON.parse(localStorage.getItem("cartItems")) }
      : { cartItems: [] };
    dispatch(addToCart({ ...product, quantity }));
    toast({
      title: `${quantity} ${
        quantity > 1 ? "Items" : "Item"
      } added to the cart.`,
      description: `${product.name}`,
      action: (
        <Link href="/cart">
          {" "}
          <ToastAction altText="Go To Cart">Go To Cart </ToastAction>
        </Link>
      ),
    });
  };
  const { toast } = useToast();

  if (product) {
    return (
      <>
        <div className="flex flex-start mt-4">
          <Button variant={"secondary"} onClick={() => router.back()}>
            Back
          </Button>
        </div>
        <div className=" flex flex-col md:flex-row items-center gap-10 mx-auto py-10 max-w-screen-xl">
          <div className="flex-1 container h-96 w-full  max-w-sm md:w-1/2">
            <Image
              className="object-fill h-full w-full rounded-lg shadow-md"
              src={product?.image}
              alt={product?.name}
              width={64}
              height={64}
            />
          </div>
          <div className=" container md:w-1/2 space-y-6 flex-1">
            <h1 className="text-2xl font-bold">{product?.name}</h1>
            <Rating
              value={overallRating}
              text={`(${product.reviews.length})`}
            />
            {product.isOnSale ? (
              <>
                {" "}
                <p className=" line-through text-red-600 inline text-sm sm:text-lg font-semibold">
                  K{product.price}
                </p>
                <span className="text-sm sm:text-lg font-semibold">
                  {" "}
                  K{((100 - product.discountPercentage) / 100) * product.price}
                </span>
              </>
            ) : (
              <>
                {" "}
                <p className="  inline text-xl font-semibold text-gray-700 mb-2">
                  K{product.price}
                </p>
              </>
            )}
            {/* <p className="text-xl font-semibold text-gray-700 mb-2">
              K {product?.price} <span> </span>
            </p> */}
            <p className="text-gray-500">
              Status: {product?.countInStock ? "In Stock" : "Out of Stock"}
            </p>
            <div className="flex items-center">
              <label htmlFor="quantity" className="mr-2 text-gray-700">
                Quantity:
              </label>

              <div className=" mx-1 w-[70px]">
                {" "}
                <Select
                  id="quantity"
                  onValueChange={(quantity) => {
                    setQuantity(quantity);
                    console.log(quantity);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={1} />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <SelectItem key={x} value={x + 1}>
                        {x + 1}{" "}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={() => addToCartHandler()}
              size="sm"
              disabled={product?.countInStock === 0}
            >
              Add to Cart
            </Button>
            <p className="text-gray-500">{product?.description}</p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap justify-between container items-start">
          <AllReviews reviews={product.reviews} />
          <RateAndReview productId={pId} />
        </div>
      </>
    );
  }
};

export default ProductDetailsPage;
