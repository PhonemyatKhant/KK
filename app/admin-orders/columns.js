"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge";
import TableDropDown from "@/components/TableDropDown";

export const columns = [
    {
        accessorKey: "_id",
        header: "Id",
    },
    {
        accessorKey: 'firstName',
        header: ({ column }) => {
            return (
                <Button className='p-0'
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "totalPrice",
        header: ({ column }) => {
            return (
                <Button className='p-0'
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const price = row.getValue('totalPrice')
            return `${price} K`;
        }

    },
    {
        accessorKey: "city",
        accessorFn: (row) => row.shippingAddress.city, // return the desired value
        header: ({ column }) => {
            return (
                <Button className='p-0'
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    City
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "isPaid",
        header: ({ column }) => {
            return (
                <Button className='p-0'
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Payment
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const isPaid = row.getValue('isPaid')
            return (
                isPaid ? <Badge>Paid</Badge> : <Badge variant='secondary'>Processing</Badge>
            )
        }
    },
    {
        accessorKey: "isDelivered",
        header: ({ column }) => {
            return (
                <Button className='p-0'
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Delivery
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const isDelivered = row.getValue('isDelivered')
            return (
                isDelivered ? <Badge>Delivered</Badge> : <Badge variant='destructive'>Not Delivered</Badge>
            )
        }
    },

    {
        id: "actions",
        cell: ({ row }) => {
            // console.log(row.getValue('_id'));

            const order = row.original

            return (
                <TableDropDown id={order._id} isPaid={order.isPaid} isDelivered={order.isDelivered} />

            )
        },
    },
]
