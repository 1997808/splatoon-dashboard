import { HandCoins, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useOverviewContext } from ".";
import { formatMoney } from "@/lib/utils";
import dayjs from "dayjs";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

const TransactionsTable = () => {
  const { transactions } = useOverviewContext()

  return (
    <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark text-black dark:text-white p-6">
      <div className="w-full pb-4 flex justify-between items-center">
        <h3 className="font-bold text-black dark:text-white text-lg">
          {"Recent transaction"}
        </h3>
        <Link href="/transactions">
          <p className="text-black dark:text-white text-sm">View All</p>
        </Link>
      </div>
      <Table>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={index} className="border-stroke dark:border-strokedark">
              <TableCell>
                {transaction.type !== 'expense' ? <HandCoins size={16} /> : <ShoppingCart size={16} />}
              </TableCell>
              <TableCell>
                <div className="col-span-2 flex flex-col justify-start items-start">
                  <p className="font-bold">{transaction.item}</p>
                  <p className="text-xs truncate">{transaction.description}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="col-span-1 flex flex-col justify-end items-end">
                  <p className="font-bold">{formatMoney(transaction.amount)}</p>
                  <p className="text-xs">{dayjs(transaction.transactionDate).format('DD/MM/YYYY')}</p>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
};

export default TransactionsTable;
