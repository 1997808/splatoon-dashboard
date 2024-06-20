import Link from "next/link";
import React, { ReactElement } from "react";

// create an TotalCard props interface
export interface TotalCardProps {
  id: string;
  title: string;
  accountNumber: string;
  totalAmount: string;
}

const TotalCard: (props: TotalCardProps) => ReactElement = ({ id, title, accountNumber, totalAmount }: TotalCardProps) => {
  return (
    <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6 pt-6 pb-4 dark:border-strokedark">
        <h3 className="font-bold text-black dark:text-white text-sm">
          {title || "Credit Card"}
        </h3>
      </div>
      <div className="p-6 pt-4">
        <div className="mb-4 flex flex-col items-start gap-3">
          <div className="flex flex-col">
            <p className="text-black dark:text-white font-bold text-xl">
              {accountNumber || "**** **** **** 1234"}
            </p>
            <p className="text-neutral-600 dark:text-gray text-sm">Account number</p>
          </div>

          <div className="flex flex-col">
            <p className="text-black dark:text-white font-bold text-xl">
              {totalAmount || "$ 2500"}
            </p>
            <p className="text-neutral-500 dark:text-gray text-sm">Total amount</p>
          </div>
        </div>

        <div className="flex justify-end gap-4.5">
          <Link href={`/balances/${id}`}>
            <button
              className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-sm text-gray hover:bg-opacity-90"
              type="submit"
            >
              Detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TotalCard;