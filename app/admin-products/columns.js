"use client"
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { handleDelete, handleEdit } from "@/utils/editDelete"

export const columns = [
    {
        accessorKey: "_id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "brand",
        header: "Brand",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            // console.log(row.getValue('_id'));

            const product = row.original
            const router = useRouter()
            const handleEdit = (product) => {
                
                router.push(`/admin-products/edit-product?productId=${product._id}`);
                console.log('edit');
            }
            const handleDelete = (product) => {
                console.log('delete');
            }
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
                        {/* <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(product.id)}
                        >
                            Copy Product ID
                        </DropdownMenuItem> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleEdit(product)}>Edit Product</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(product)}>Delete Product</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
