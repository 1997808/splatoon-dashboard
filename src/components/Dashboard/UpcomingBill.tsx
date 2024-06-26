import dayjs from "dayjs";

interface Bills {
  item: string;
  paymentMethod: number;
  lastCharge: string;
  dueDate: string;
  amount: number;
}

const BillsDemoData: Bills[] = [
  {
    item: "Netflix",
    paymentMethod: 1,
    lastCharge: "2024-06-15",
    dueDate: "2024-07-15",
    amount: 15,
  },
  {
    item: "Spotify",
    paymentMethod: 2,
    lastCharge: "2024-06-23",
    dueDate: "2024-07-23",
    amount: 10,
  },
];

const UpcomingBillsTable = () => {
  return (
    <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-black dark:text-white px-6">
      {BillsDemoData.map((transaction, key) => (
        <div
          className="grid grid-cols-4 border-b border-stroke py-6 dark:border-strokedark"
          key={key}
        >
          <div className="col-span-1 flex justify-start items-center">
            <div className="flex flex-col px-4 py-2 bg-neutral-100 dark:bg-black justify-center items-center rounded">
              <p className="text-neutral-500 dark:text-gray font-bold">{dayjs(transaction.dueDate).format("MMM")}</p>
              <p className="text-xl font-bold">{dayjs(transaction.dueDate).format("DD")}</p>
            </div>
          </div>
          <div className="col-span-2 flex flex-col justify-center items-start gap-0.5">
            <p className="text-base font-bold">{transaction.item}</p>
            <p className="text-xs">Last Charge - {transaction.lastCharge}</p>
          </div>
          <div className="col-span-1 flex justify-end items-center font-bold">
            ${transaction.amount}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingBillsTable;
