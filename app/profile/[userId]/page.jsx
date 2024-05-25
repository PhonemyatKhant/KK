"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { DataTable } from "../../admin-products/data-table";
import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { columns } from "./columns";

const ProfilePage = ({ params }) => {
  const [orders, setOrders] = useState([]);
  const userId = params.userId;
  const { status, data: session } = useSession();
  console.log(session?.user);
  useEffect(() => {
    const getCustomerOrders = async () => {
      try {
        const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
        const res = await fetch(`${apiEndpoint}/api/orders/profile/${userId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch customer order");
        }
        const customerOrders = await res.json();
        setOrders(customerOrders);
      } catch (error) {
        console.error(error);
        // Handle error redirect
      }
    };
    getCustomerOrders();
  }, [userId]);
  return (
    <>
      <div className="mt-4">
        <h1 className="text-2xl my-4">Profile</h1>
        <div className="flex justify-between gap-4">
          <Card>
            <CardContent className="container mt-4">
              <h1 className=" text-muted-foreground p-2">
                Customer ID :{" "}
                <span className=" text-black ">{session?.user?.id}</span>
              </h1>
              <h1 className=" text-muted-foreground p-2">
                Name :{" "}
                <span className=" text-black ">{session?.user?.name}</span>
              </h1>
              <h1 className=" text-muted-foreground p-2">
                Email :{" "}
                <span className=" text-black ">{session?.user?.email}</span>
              </h1>
            </CardContent>
          </Card>
        </div>
        <div className=" mx-auto py-10">
          <DataTable columns={columns} data={orders} type="order" />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
