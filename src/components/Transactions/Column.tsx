"use client"

import { ColumnDef } from "@tanstack/react-table"
import { formatMoney } from "@/lib/utils"
import dayjs from "dayjs"
import Image from "next/image"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  id: string | number
  item: string
  description: string
  amount: number
  type: string
  balance: any
  user: number,
  category: number,
  transactionDate: string
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "item",
    header: "Item",
    cell: ({ row }) => {
      const item = row.original.item
      return (
        <p>{item}</p>
      )
    }
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.original.description
      return (
        <p>{description}</p>
      )
    }
  },
  {
    accessorKey: "transactionDate",
    header: "Date",
    cell: ({ row }) => {
      const transactionDate = row.original.transactionDate
      return (
        <p>{dayjs(transactionDate).format('DD-MM-YYYY HH:mm')}</p>
      )
    }
  },
  {
    accessorKey: "balance",
    header: "Balance used",
    cell: ({ row }) => {
      const balance = row.original.balance
      return (
        <p>{balance?.sourceName}</p>
      )
    }
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.original.amount
      const currency = row.original.balance?.currency
      const formatted = formatMoney(amount)
      return <div className="text-right font-medium">{formatted} {currency ?? ''}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original

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
            <DropdownMenuItem>
              <Link href={`/transactions/${id}`} className="w-full h-auto">
                Edit
              </Link>
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem>Active</DropdownMenuItem>
            <DropdownMenuItem>Delay one cycle</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]