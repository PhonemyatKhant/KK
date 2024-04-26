"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { resetFilter } from "@/app/redux/slices/filterSlice";
import { FaBars, FaShoppingBag } from "react-icons/fa";
import { Separator } from "./ui/separator";

function Header() {
  const { status, data: session } = useSession();
  const side = "left";
  const dispatch = useDispatch();

  const resetFilterHandler = async () => {
    dispatch(resetFilter());
  };

  const { cartItems } = useSelector((state) => state.cart);

  return (
    <header className=" bg-white py-4 sm:container max-sm:px-3 flex items-center justify-between border-b border-gray-200 sm:flex-row mb-6 ">
      {/* Bars Icon  */}
      <div className="md:hidden w-[100px]">
        <Sheet key={side}>
          <SheetTrigger>
            <FaBars />
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>
                <Link href="/">
                  <h1 className=" pb-7 font-medium text-xl text-gray-800">
                    KK Fabrics
                  </h1>
                </Link>
              </SheetTitle>

              <div className="flex flex-col items-center justify-center gap-3 mt-10">
                <Link href="/collections">
                  <Button
                    onClick={resetFilterHandler}
                    variant={"ghost"}
                    size={"sm"}
                  >
                    Collections
                  </Button>
                </Link>
                <Separator />
                <Link href="/about-us">
                  <Button variant={"ghost"} size={"sm"}>
                    About Us
                  </Button>
                </Link>
                <Separator />
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      {/* mobile nav1 */}
      <nav className="hidden md:flex items-center max-w-[100px]">
        <Link href="/collections">
          <Button onClick={resetFilterHandler} variant={"ghost"} size={"sm"}>
            Collections
          </Button>
        </Link>
        <Link href="/about-us">
          <Button variant={"ghost"} size={"sm"}>
            About Us
          </Button>
        </Link>
      </nav>
      {/* title */}
      <Link className=" justify-self-center" href="/">
        <h1 className=" font-medium text-xl text-gray-800">KK Fabrics</h1>
      </Link>
      {/* cart/profile */}
      <nav className="flex gap-1 items-center ">
        <Link href="/cart">
          <Button className="p-1" variant={"ghost"} size={"sm"}>
            <ShoppingCart />
            <Badge className="p-0 px-1 relative bottom-2 right-1">
              {cartItems
                ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
                : 0}
            </Badge>
          </Button>
        </Link>
        <Link className="flex items-center justify-center " href="">
          {status === "authenticated" ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={session?.user?.image} alt="user image" />
                    <AvatarFallback>
                      {session?.user?.name[0]}
                      {session?.user?.name[1]}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/profile/${session.user.id}`}>
                      <Button variant={"ghost"} size={"sm"}>
                        <span>Profile</span>
                      </Button>
                    </Link>
                  </DropdownMenuItem>
                  {session?.user?.email === "phonemyatkhant46@gmail.com" && (
                    <>
                      <DropdownMenuItem>
                        <Link href="/admin-products">
                          <Button variant={"ghost"} size={"sm"}>
                            <span>Products</span>
                          </Button>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/admin-orders">
                          <Button variant={"ghost"} size={"sm"}>
                            <span>Orders</span>
                          </Button>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem>
                    <Button variant={"ghost"} size={"sm"}>
                      <span onClick={() => signOut()}>Sign Out</span>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              className="flex items-center justify-center "
              variant={"default"}
              size={"sm"}
            >
              <span onClick={() => signIn()}>Sign In</span>
            </Button>
          )}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
