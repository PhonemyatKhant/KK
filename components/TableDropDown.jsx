"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  updatePaymentHandler,
  updateDeliveryHandler,
  viewOrderStatus,
} from "@/utils/updateOrder";

const TableDropDown = ({ id, isPaid, isDelivered }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => viewOrderStatus(id, router)}>
          View Order Status
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updatePaymentHandler(id, isPaid, router)}
        >
          Update Payment Status
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateDeliveryHandler(id, isDelivered, router)}
        >
          Update Delivery Status
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableDropDown;
