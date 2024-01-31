"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OrderColumn = {
    id: string
    phone: string
    email: string
    address: string
    products: string
    totalPrice: number
    isPaid: boolean
    createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: "products",
        header: "Products",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "totalPrice",
        header: "Total price",
    },
    {
        accessorKey: "isPaid",
        header: "Paid",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },

]
