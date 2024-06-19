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
    <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-black dark:text-white p-6">
      <div className="grid grid-cols-5 pb-5 font-bold">
        <div className="col-span-1 flex justify-start items-center">
          Item
        </div>
        <div className="col-span-1 flex justify-center items-center">
          Category
        </div>
        <div className="col-span-1 flex justify-center items-center">
          Date
        </div>
        <div className="col-span-1 flex justify-center items-center">
          Payment method
        </div>
        <div className="col-span-1 flex justify-end items-center">
          Amount
        </div>
      </div>

      {transactionsDemoData.map((transaction, key) => (
        <div
          className="grid grid-cols-5 border-t border-stroke py-5 dark:border-strokedark text-sm"
          key={key}
        >
          <div className="col-span-1 flex justify-start items-center font-bold">
            {transaction.item}
          </div>
          <div className="col-span-1 flex justify-center items-center">
            {transaction.category}
          </div>
          <div className="col-span-1 flex justify-center items-center">
            {transaction.createdDate}
          </div>
          <div className="col-span-1 flex justify-center items-center">
            {transaction.paymentMethod}
          </div>
          <div className="col-span-1 flex justify-end items-center">
            ${transaction.amount}
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
