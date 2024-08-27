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
export type Payment = {
  id: string | number
  logo: string
  item: string
  description: string
  amount: number
  type: string
  balance: any
  user: number,
  category: number,
  status: string,
  frequencyValue: number,
  frequencyUnit: string,
  currency: string,
  dueDate: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "dueDate",
    header: "Due date",
    cell: ({ row }) => {
      const dueDate = row.original.dueDate
      return (
        <div className="flex flex-col px-4 py-2 bg-neutral-100 dark:bg-black justify-center items-center rounded">
          <p className="text-neutral-500 dark:text-gray font-bold">{dayjs(dueDate).format("MMM")}</p>
          <p className="text-xl font-bold">{dayjs(dueDate).format("DD")}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => {
      const logo = row.original.logo
      return (
        <Image
          src={logo}
          width={48}
          height={48}
          alt="Product"
        />
      )
    }
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const item = row.original.item
      const description = row.original.description
      return (
        <>
          <p className="font-bold">{item}</p>
          <p className="line-clamp-3">{description}</p>
        </>
      )
    }
  },
  {
    accessorKey: "balance",
    header: "Balance used",
    cell: ({ row }) => {
      const balance = row.original.balance
      return (
        <>
          <p>{balance?.sourceName}</p>
        </>
      )
    }
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.original.amount
      const currency = row.original.currency
      const formatted = formatMoney(amount)
      return <div className="text-right font-medium">{formatted} {currency + ''}</div>
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
              <Link href={`/bills/${id}`} className="w-full h-auto">
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Active</DropdownMenuItem>
            <DropdownMenuItem>Delay one cycle</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]