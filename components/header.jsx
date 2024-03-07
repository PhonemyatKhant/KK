"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "lucide-react";
import { useSelector } from "react-redux";
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

function Header() {
  const { status, data: session } = useSession();
  const side = "left";

  const { cartItems } = useSelector((state) => state.cart);
 

  return (
    <header className="container bg-white py-4 px-6 flex items-center justify-between border-b border-gray-200 sm:flex-row max-lg:px-4">
      {/* Header content */}
      <div className="sm:hidden">
        <Sheet key={side}>
          <SheetTrigger>
            <Menu className="h-4 w-4" />
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>
                <Link href="/">
                  <h1 className="font-bold text-xl text-gray-800">KKFabrics</h1>
                </Link>
              </SheetTitle>
              <SheetDescription>
                <div className="flex flex-col items-center justify-center gap-10 mt-10">
                  <Link href="/cart">
                    <Button variant={"ghost"} size={"sm"}>
                      Cart
                      <Badge className="p-0 px-1 relative bottom-2 right-1">
                        {cartItems
                          ? cartItems.reduce(
                              (acc, item) => acc + item.quantity,
                              0
                            )
                          : 0}
                      </Badge>
                    </Button>
                  </Link>
                  <Link href="/collections">
                    <Button variant={"ghost"} size={"sm"}>
                      Collections
                    </Button>
                  </Link>
                  <Link href="/about-us">
                    <Button variant={"ghost"} size={"sm"}>
                      About Us
                    </Button>
                  </Link>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <Link href="/">
        <h1 className="font-bold text-xl text-gray-800">KKFabrics</h1>
      </Link>
      <nav className="hidden md:flex items-center">
        <Link href="/collections">
          <Button variant={"ghost"} size={"sm"}>
            Collections
          </Button>
        </Link>
        <Link href="/about-us">
          <Button variant={"ghost"} size={"sm"}>
            About Us
          </Button>
        </Link>
        <Link href="/cart">
          <Button variant={"ghost"} size={"sm"}>
            Cart
            <Badge className="p-0 px-1 relative bottom-2 right-1">
              {cartItems
                ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
                : 0}
            </Badge>
          </Button>
        </Link>
        <Link className="flex items-center justify-center gap-4" href="">
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
                    <Button variant={"ghost"} size={"sm"}>
                      <span>Profile</span>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {session?.user?.email === "phonemyatkhant46@gmail.com" && (
                      <Link href="/admin-products">
                        <Button variant={"ghost"} size={"sm"}>
                          <span>Products</span>
                        </Button>
                      </Link>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button variant={"ghost"} size={"sm"}>
                      <span>Orders</span>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button variant={"ghost"} size={"sm"}>
                      <span onClick={() => signOut()}>Sign Out</span>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button variant={"default"} size={"sm"}>
              <span onClick={() => signIn("google")}>Sign In</span>
            </Button>
          )}
        </Link>
      </nav>
      {/* mobile */}
      <Link
        className="md:hidden flex items-center justify-center gap-4 mr-4"
        href=""
      >
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
                  <Button variant={"ghost"} size={"sm"}>
                    <span>Profile</span>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {session?.user?.email === "phonemyatkhant46@gmail.com" && (
                    <Link href="/admin-products">
                      <Button variant={"ghost"} size={"sm"}>
                        <span>Products</span>
                      </Button>
                    </Link>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button variant={"ghost"} size={"sm"}>
                    <span>Orders</span>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button variant={"ghost"} size={"sm"}>
                    <span onClick={() => signOut()}>Sign Out</span>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button variant={"default"} size={"sm"}>
            <span onClick={() => signIn("google")}>Sign In</span>
          </Button>
        )}
      </Link>
    </header>
  );
}

export default Header;
