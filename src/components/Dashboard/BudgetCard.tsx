import React from "react";
import ChartGauge from "./ChartGauge";
import { formatMoney } from "@/lib/utils";
import { useOverviewContext } from ".";
import dayjs from "dayjs";

const BudgetCard = () => {
  const { budgetAmount, totalExpenses } = useOverviewContext();

  return (
    <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark w-full h-full">
      <div className="border-b border-stroke px-6 pt-6 pb-4 dark:border-strokedark flex justify-between items-center">
        <h3 className="font-bold text-black dark:text-white text-sm">
          {"Budget overview"}
        </h3>
        <p className="text-black dark:text-white text-sm">{dayjs().format("MMM-YYYY")}</p>
      </div>
      <div className="p-6 pt-4">
        <div className="grid grid-cols-6">
          <div className="flex flex-col items-start gap-4 col-span-3">
            <div className="flex flex-col">
              <p className="text-neutral-600 dark:text-gray text-sm">Current</p>
              <p className="text-black dark:text-white font-bold text-xl">
                {totalExpenses ? formatMoney(totalExpenses) : "N/A"}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-neutral-500 dark:text-gray text-sm">Monthly Budget</p>
              <p className="text-black dark:text-white font-bold text-xl">
                {budgetAmount ? formatMoney(budgetAmount) : "N/A"}
              </p>
            </div>
          </div>
          <div className="col-span-3">
            <ChartGauge />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
