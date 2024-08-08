import dayjs from "dayjs";
import Image from "next/image";
import { getAllBills } from "@/tools/bill";
import { useState, useEffect } from "react";
import Link from "next/link";

const BillsTable = () => {
  const [bills, setBills] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBills()
        setBills(data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  return (
    <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark text-black dark:text-white p-6">
      <div className="grid grid-cols-4 md:grid-cols-6 pb-5 font-bold">
        <div className="col-span-1 flex justify-start items-center">
          Due date
        </div>
        <div className="col-span-1 hidden md:flex justify-start items-center">
          Logo
        </div>
        <div className="col-span-2 flex justify-start items-center">
          Description
        </div>
        <div className="col-span-1 hidden md:flex justify-center items-center">
          Balance used
        </div>
        <div className="col-span-1 flex justify-end items-center">
          Amount
        </div>
      </div>

      {bills.map((bill: any, key: number) => (
        <>
          <Link href={`/bills/${bill.id}`} key={key}>
            <div
              className="hidden md:grid grid-cols-6 border-t border-stroke py-5 dark:border-strokedark text-sm"
              key={key}
            >
              <div className="col-span-1 flex justify-start items-center">
                <div className="flex flex-col px-4 py-2 bg-neutral-100 dark:bg-black justify-center items-center rounded">
                  <p className="text-neutral-500 dark:text-gray font-bold">{dayjs(bill.dueDate).format("MMM")}</p>
                  <p className="text-xl font-bold">{dayjs(bill.dueDate).format("DD")}</p>
                </div>
              </div>
              <div className="col-span-1 flex justify-start items-center">
                <Image
                  src={bill.logo}
                  width={48}
                  height={48}
                  alt="Product"
                />
              </div>
              <div className="col-span-2 flex flex-col justify-center items-start">
                <p className="font-bold">{bill.item}</p>
                <p className="line-clamp-3">{bill.description}</p>
              </div>
              <div className="col-span-1 flex justify-center items-center">
                {bill?.balance?.sourceName}
              </div>
              <div className="col-span-1 flex justify-end items-center">
                {bill.amount.toLocaleString('en-US', { style: 'currency', currency: bill.currency })}
              </div>
            </div>
          </Link>

          <Link href={`/bills/${bill.id}`} key={'sm' + key}>
            <div
              className="grid md:hidden grid-cols-4 border-t border-stroke py-6 dark:border-strokedark"
              key={key}
            >
              <div className="col-span-1 flex justify-start items-center">
                <div className="flex flex-col px-4 py-2 bg-neutral-100 dark:bg-black justify-center items-center rounded">
                  <p className="text-neutral-500 dark:text-gray font-bold">{dayjs(bill.dueDate).format("MMM")}</p>
                  <p className="text-xl font-bold">{dayjs(bill.dueDate).format("DD")}</p>
                </div>
              </div>
              <div className="col-span-2 flex flex-col justify-center items-start gap-0.5">
                <p className="text-base font-bold">{bill.item}</p>
                <p className="text-xs">Balance used - {bill?.balance?.sourceName}</p>
              </div>
              <div className="col-span-1 flex justify-end items-center font-bold">
                {bill.amount.toLocaleString('en-US', { style: 'currency', currency: bill.currency })}
              </div>
            </div>
          </Link>
        </>
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

export default BillsTable;
