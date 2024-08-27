import dayjs from "dayjs";
import { useOverviewContext } from ".";
import { formatMoney } from "@/lib/utils";

const UpcomingBillsTable = () => {
  const { bills } = useOverviewContext();

  return (
    <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark text-black dark:text-white px-6">
      {bills.map((bill, key) => (
        <div
          className={`grid grid-cols-4 py-6 ${key === 0 ? `border-b` : ``} border-stroke dark:border-strokedark`}
          key={key}
        >
          <div className="col-span-1 flex justify-start items-center">
            <div className="flex flex-col px-4 py-2 bg-neutral-100 dark:bg-black justify-center items-center rounded">
              <p className="text-neutral-500 dark:text-gray font-bold">{dayjs(bill.dueDate).format("MMM")}</p>
              <p className="text-xl font-bold">{dayjs(bill.dueDate).format("DD")}</p>
            </div>
          </div>
          <div className="col-span-2 flex flex-col justify-center items-start gap-0.5 px-2">
            <p className="text-base font-bold">{bill.item}</p>
            <p className="text-xs">Charge every {bill.frequencyValue} {bill.frequencyUnit}</p>
          </div>
          <div className="col-span-1 flex items-center font-bold text-end">
            {formatMoney(bill.amount)} {bill.currency}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingBillsTable;
