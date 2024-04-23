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
import { DataTable } from "../admin-products/data-table";
import { data } from "autoprefixer";

const ProfilePage = () => {
  const { data: session } = useSession();
  return (
    <>
      <div className="container mt-4">
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
        <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data}  type="order" />
      </div>
      </div>
      <div className="container mx-auto py-10"></div>
    </>
  );
};

export default ProfilePage;
