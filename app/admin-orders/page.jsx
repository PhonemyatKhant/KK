import { Button } from "@/components/ui/button";
import Link from "next/link";
import { columns } from "./columns";
import { DataTable } from "../admin-products/data-table";
import { getOrders } from "@/utils/getOrders";
import React from "react";

const AdminPrderPage = async () => {
  const orders = await getOrders();

  return (
    <>
      <div className=" flex justify-between mt-4">
        <h1 className="text-2xl">All Orders</h1>
      </div>
      <div className=" mx-auto py-10">
        <DataTable columns={columns} data={orders} type="order" />
      </div>
    </>
  );
};

export default AdminPrderPage;
