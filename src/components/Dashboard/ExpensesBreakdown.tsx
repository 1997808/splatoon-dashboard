import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { formatMoney } from "@/lib/utils";

export interface ExpensesCardProps {
  category: string;
  changeAmount: string;
  totalAmount: number;
  percent?: number;
}

const ExpensesBreakdown = () => {
  return (
    <div className="rounded-lg border pb-4 border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
      <div className="px-6 pt-6 pb-2 md:px-6 flex justify-between items-center">
        <h4 className="text-lg font-semibold text-black dark:text-white">
          Expenses breakdown
        </h4>
        <p className="text-xs">
          *Compare to last month
        </p>
      </div>

      {demoData.map((item, key) => (
        <div
          className="grid grid-cols-5 px-6 py-2 dark:border-strokedark md:px-6"
          key={key}
        >
          <div className="col-span-3 flex items-center relative w-full h-full min-h-8">
            <div className="absolute top-0 left-0 h-full bg-blue-100 dark:bg-gray-500 dark:bg-opacity-15 z-0 rounded" style={{ "width": item.percent + "%" }}></div>
            <div className="absolute top-0 left-0 h-full px-2 py-1 z-10 capitalize"> {item.category}</div>
          </div>
          <div className="col-span-1 flex justify-end items-center">
            <p className="font-bold text-sm text-black dark:text-white">
              {formatMoney(item.totalAmount)}
            </p>
          </div>
          <div className="col-span-1 flex justify-end items-center">
            <div className="flex gap-1 text-sm text-black dark:text-white">
              {item.changeAmount}%
              {item.changeAmount && item.changeAmount.includes("-") ? (
                <ArrowDownRight size={20} color={"green"} />
              ) : (
                <ArrowUpRight size={20} color={"red"} />
              )}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const demoData: ExpensesCardProps[] = [
  {
    category: 'housing',
    changeAmount: '-10',
    totalAmount: 5000,
    percent: 33,
  },
  {
    category: 'food',
    changeAmount: '8',
    totalAmount: 1000,
    percent: 7,
  },
  {
    category: 'transportation',
    changeAmount: '20',
    totalAmount: 1500,
    percent: 10,
  },
  {
    category: 'entertainment',
    changeAmount: '-2',
    totalAmount: 2000,
    percent: 13,
  },
  {
    category: 'shopping',
    changeAmount: '20',
    totalAmount: 2500,
    percent: 17,
  },
  {
    category: 'others',
    changeAmount: '-19',
    totalAmount: 3000,
    percent: 20,
  },
].sort((a, b) => b.totalAmount - a.totalAmount);

export default ExpensesBreakdown;
