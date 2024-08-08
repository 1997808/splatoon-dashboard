import Link from "next/link";
import React, { ReactElement } from "react";
import ChartGauge from "./ChartGauge";
import { Pencil } from "lucide-react";

// create an SavingCard props interface
export interface SavingCardProps {
  targetAchived: string;
  target: string;
}

const SavingCard: (props: SavingCardProps) => ReactElement = ({ targetAchived, target }: SavingCardProps) => {
  return (
    <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark w-full h-full">
      <div className="border-b border-stroke px-6 pt-6 pb-4 dark:border-strokedark">
        <h3 className="font-bold text-black dark:text-white text-sm">
          {"Savings Goal"}
        </h3>
      </div>
      <div className="p-6 pt-4">
        <div className="grid grid-cols-6 mb-6">
          <div className="flex flex-col items-start gap-4 col-span-3">
            <div className="flex flex-col">
              <p className="text-neutral-600 dark:text-gray text-sm">Target Achived</p>
              <p className="text-black dark:text-white font-bold text-xl">
                {targetAchived || "N/A"}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-neutral-500 dark:text-gray text-sm">Monthly Target</p>
              <p className="text-black dark:text-white font-bold text-xl">
                {target || "N/A"}
              </p>
            </div>
          </div>
          <div className="col-span-3">
            <ChartGauge />
          </div>
        </div>

        <div className="flex justify-center gap-4.5">
          {/* <Link href={`/balances/${id}`}> */}
          <button
            className="flex justify-center items-center gap-2 rounded bg-primary px-6 py-2 font-medium text-sm text-gray hover:bg-opacity-90"
            type="submit"
          >
            <p>Adjust Goal</p>
            <Pencil size={14} />
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default SavingCard;
