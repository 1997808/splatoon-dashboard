import { Pencil } from "lucide-react";
import React, { ReactElement } from "react";

export interface GoalsCardProps {
  category: string;
  totalAmount: string;
}

const GoalsCard: (props: any) => ReactElement = ({ category, totalAmount }: any) => {
  return (
    <div className="rounded-lg border border-stroke bg-white shadow-default dark:bg-boxdark dark:border-strokedark col-span-4">
      <div className="flex justify-between items-center dark:bg-inherit px-6 py-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-black dark:text-white text-sm capitalize">
            {category || "N/A"}
          </h3>
          <p className="font-bold text-black dark:text-white text-lg">
            {totalAmount || "N/A"}
          </p>
        </div>
        <div className="flex flex-col items-end gap-0.5 text-black dark:text-white text-sm">
          <div className="flex justify-end gap-4.5">
            {/* <Link href={`/balances/${id}`}> */}
            <button
              className="flex justify-center items-center gap-2 rounded bg-primary px-6 py-2 font-medium text-sm text-gray hover:bg-opacity-90"
              type="submit"
            >
              <p>Adjust</p>
              <Pencil size={14} />
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsCard;
