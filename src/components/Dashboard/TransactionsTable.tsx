import { ShoppingCart } from "lucide-react";
import Image from "next/image";

// create an interface for transactionsDemoData
interface Transaction {
  shopName: string;
  category: string;
  item: string;
  amount: number;
  paymentMethod: number;
  createdDate: string;
}

// create an array of demo objects for transactionsDemoData with random shopName, category, item, amount, paymentMethod, and createdDate. add some item like shirt, pizza, movie ticket, a laptop and renting apartments
const transactionsDemoData: Transaction[] = [
  {
    shopName: "Amazon",
    category: "Shopping",
    item: "Laptop",
    amount: 2500,
    paymentMethod: 1,
    createdDate: "2021-05-01",
  },
  {
    shopName: "Pizza Hut",
    category: "Food",
    item: "Pizza",
    amount: 15,
    paymentMethod: 2,
    createdDate: "2021-05-02",
  },
  {
    shopName: "Cineplex",
    category: "Entertainment",
    item: "Movie Ticket",
    amount: 20,
    paymentMethod: 3,
    createdDate: "2021-05-03",
  },
  {
    shopName: "Amazon",
    category: "Shopping",
    item: "Shirt",
    amount: 30,
    paymentMethod: 1,
    createdDate: "2021-05-04",
  },
  {
    shopName: "Renting Apartments",
    category: "Housing",
    item: "Rent",
    amount: 1500,
    paymentMethod: 4,
    createdDate: "2021-05-05",
  },
];

const TransactionsTable = () => {
  return (
    <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-black dark:text-white p-6 pb-0">
      <div className="pb-4 flex justify-between items-center">
        <h3 className="font-bold text-black dark:text-white text-lg">
          {"Recent transaction"}
        </h3>
        <p className="text-black dark:text-white text-sm">View All</p>
      </div>
      {transactionsDemoData.map((transaction, key) => (
        <div
          className="grid grid-cols-4 border-t border-stroke py-6 dark:border-strokedark"
          key={key}
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
            <p className="text-xs">{transaction.createdDate}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionsTable;
