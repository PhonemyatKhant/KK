"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const { status, data: session } = useSession();
  return (
    <header className="container bg-white py-4 px-6 flex items-center justify-between border-b border-gray-200 sm:flex-row">
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
            Cart<Badge className="p-0 px-1 relative bottom-2 right-1">3</Badge>
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
      <button className="block md:hidden">
        <svg
          className="h-6 w-6 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </header>
  );
}

export default Header;
