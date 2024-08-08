import dayjs from "dayjs";
import { ShoppingCart } from "lucide-react";

// create an interface for transactionsDemoData
interface Transaction {
  shopName: string;
  category: string;
  item: string;
  amount: number;
  paymentMethod: number;
  transactionDate: string;
}

const TransactionsTable = ({ data }: any) => {
  return (
    <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark text-black dark:text-white p-6">
      <div className="grid grid-cols-4 md:grid-cols-5 pb-5 font-bold">
        <div className="col-span-1 flex md:hidden justify-start items-center">
          Type
        </div>
        <div className="col-span-2 md:col-span-1 flex justify-start items-center">
          Item
        </div>
        <div className="col-span-1 hidden md:flex justify-center items-center">
          Category
        </div>
        <div className="col-span-1 hidden md:flex justify-center items-center">
          Date
        </div>
        <div className="col-span-1 hidden md:flex justify-center items-center">
          Payment method
        </div>
        <div className="col-span-1 flex justify-end items-center">
          Amount
        </div>
      </div>

      {data.map((transaction: Transaction, key: number) => (
        <div
          className="hidden md:grid grid-cols-4 md:grid-cols-5 border-t border-stroke py-6 dark:border-strokedark text-sm"
          key={"md" + key}
        >
          <div className="col-span-1 flex justify-start items-center font-bold">
            {transaction.item}
          </div>
          <div className="col-span-1 flex justify-center items-center">
            {transaction.category}
          </div>
          <div className="col-span-1 flex justify-center items-center">
            {dayjs(transaction.transactionDate).format('DD-MM-YYYY HH:mm')}
          </div>
          <div className="col-span-1 hidden md:flex justify-center items-center">
            {transaction.paymentMethod}
          </div>
          <div className="col-span-1 flex justify-end items-center">
            ${transaction.amount}
          </div>
        </div>
      ))}

      {data.map((transaction: Transaction, key: number) => (
        <div
          className="grid md:hidden grid-cols-4 border-t border-stroke py-6 dark:border-strokedark text-sm"
          key={'sm' + key}
        >
          <div className="col-span-1 flex justify-start items-center font-bold">
            <div className="flex flex-col p-2 bg-neutral-100 dark:bg-black justify-center items-center rounded">
              <ShoppingCart size={16} />
            </div>
          </div>
          <div className="col-span-2 flex flex-col justify-start items-start">
            <p className="font-bold">{transaction.item}</p>
            <p className="text-xs">{transaction.category}</p>
          </div>
          <div className="col-span-1 flex flex-col justify-end items-end">
            <p className="font-bold">${transaction.amount}</p>
            <p className="text-xs">{dayjs(transaction.transactionDate).format('DD-MM-YYYY HH:mm')}</p>
          </div>
        </div>
      ))}
      <div className="flex justify-center py-6">
        <button
          className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-sm text-gray hover:bg-opacity-90"
          type="submit"
        >
          Load more
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
