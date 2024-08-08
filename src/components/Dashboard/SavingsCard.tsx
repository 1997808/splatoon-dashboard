import React, { ReactElement } from "react";
import ChartGauge from "@/components/Goals/ChartGauge";
import { Goal, Medal } from "lucide-react";
import dayjs from "dayjs";

// create an SavingCard props interface
export interface SavingCardProps {
  targetAchived: string;
  target: string;
}

const SavingCard: (props: SavingCardProps) => ReactElement = ({ targetAchived, target }: SavingCardProps) => {
  return (
    <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark w-full h-full">
      <div className="border-b border-stroke px-6 pt-6 pb-4 dark:border-strokedark flex justify-between items-center">
        <h3 className="font-bold text-black dark:text-white text-lg">
          ${"20000"}
        </h3>
        <p className="text-black dark:text-white text-sm">{dayjs().format("MMM-YYYY")}</p>
      </div>
      <div className="p-6 pt-4">
        <div className="grid grid-cols-6">
          <div className="flex flex-col items-start gap-4 col-span-3">
            <div className="flex gap-1.5">
              <Medal className="mt-1" size={16} />
              <div className="flex flex-col">
                <p className="text-neutral-600 dark:text-gray text-sm">Target Achived</p>
                <p className="text-black dark:text-white font-bold">
                  {targetAchived || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex gap-1.5">
              <Goal className="mt-1" size={16} />
              <div className="flex flex-col">
                <p className="text-neutral-500 dark:text-gray text-sm">Monthly Target</p>
                <p className="text-black dark:text-white font-bold">
                  {target || "N/A"}
                </p>
              </div>
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

export default SavingCard;
