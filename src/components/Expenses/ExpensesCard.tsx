import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import React, { ReactElement } from "react";

interface Expenses {
  id: number;
  item: string;
  amount: string;
  createdDate: string;
}

export interface ExpensesCardProps {
  category: string;
  changeAmount: string;
  totalAmount: string;
  data: Expenses[];
}

const ExpensesCard: (props: any) => ReactElement = ({ category, changeAmount, totalAmount, data }: any) => {
  return (
    <div className="rounded-lg border border-stroke bg-white shadow-lg dark:bg-boxdark dark:border-strokedark col-span-12 md:col-span-4">
      <div className="flex justify-between items-center bg-neutral-100 dark:bg-black px-6 py-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-black dark:text-white text-sm capitalize">
            {category || "N/A"}
          </h3>
          <p className="font-bold text-black dark:text-white text-lg">
            {totalAmount || "N/A"}
          </p>
        </div>
        <div className="flex flex-col items-end gap-0.5 text-black dark:text-white text-sm">
          <div className="flex gap-2 font-bold">{changeAmount + '%' || "N/A"}
            {changeAmount && changeAmount.includes("-") ? (
              <ArrowDownRight size={20} color={"green"} />
            ) : (
              <ArrowUpRight size={20} color={"red"} />
            )}
          </div>
          <p className="text-xs">Compare to last month</p>
        </div>
      </div>
      {data && data.map((expense: Expenses, key: number) => {
        const { item, amount, createdDate } = expense;
        return (
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray dark:border-graydark">
            <h3 className="text-black dark:text-white font-bold">
              {item || "N/A"}
            </h3>
            <div className="flex flex-col items-end gap-0.5 text-black dark:text-white text-sm">
              <p className="font-bold">{amount || "N/A"}</p>
              <p className="text-sm">{createdDate || "N/A"}</p>
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default ExpensesCard;
