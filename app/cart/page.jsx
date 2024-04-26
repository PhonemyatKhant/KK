"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  async function onQuantityChange(quantity, product) {
    dispatch(addToCart({ ...product, quantity }));
  }
  async function removeFromCartHandler(id) {
    dispatch(removeFromCart(id));
  }
  const { cartItems, itemsPrice } = useSelector((state) => state.cart);
  // console.log(cartItems);
  return (
    <div className="mt-7 lg:px-32 ">
      <h1 className=" text-2xl mb-6">Shopping Cart</h1>
      <div className="flex justify-between gap-7 max-lg:flex-col">
        <div className="flex flex-col flex-1">
          {cartItems.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className=" flex max-w-14 h-full">
                    <Image
                      style={{
                        width: "auto",
                        height: "5rem",
                        borderRadius: "10%",
                        objectFit: "cover",
                      }}
                      src={item.image}
                      alt={item.name}
                      width={48}
                      height={48}
                    />
                  </div>

                  <Link
                    className=" hover:cursor-pointer underline flex-wrap  mx-1  max-sm:max-w-[50px] w-40"
                    href={`/collections/${item._id}`}
                  >
                    <span>{item.name} </span>
                  </Link>
                </div>

                {/* <p className=" max-w-20 flex-wrap text-sm ">{item.brand}</p> */}
                <p className=" pt-2 text-sm">{(((100 - item.discountPercentage) / 100) * item.price)*item.quantity} K </p>
                <div className=" mx-5 w-[70px]">
                  {" "}
                  <Select
                    onValueChange={(quantity) =>
                      onQuantityChange(quantity, item)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={item.quantity} />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <SelectItem key={x} value={x + 1}>
                          {x + 1}{" "}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={() => removeFromCartHandler(item._id)}
                  size="sm"
                >
                  <TrashIcon />
                </Button>
              </div>
              <Separator className="w-full h-0.5 border my-4" />
            </div>
          ))}
        </div>
        <Card className="self-start max-w-[250px]">
          <CardHeader>
            <CardTitle>Subtotal</CardTitle>
            <CardDescription>{itemsPrice} K </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Taxes and shipping calculated at checkout</p>
          </CardContent>
          <CardFooter>
            <Link href="/cart/checkout">
              <Button>CHECK OUT</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CartPage;
