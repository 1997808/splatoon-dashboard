"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { columns } from "./Column"
import { DataTable } from "./DataTable"
import { getAllTransactions } from "@/tools/transaction";
import { TableMeta } from "@/components/common/TableMeta";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export type ContextProps = {
  transactions: any[];
  meta: TableMeta
  filter?: any;
  setFilter: React.Dispatch<React.SetStateAction<any>>;
};

const TransactionContext = createContext<ContextProps>({ transactions: [], meta: { page: 1, take: 10 }, filter: {}, setFilter: () => { } })

const Transactions: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [transactions, setTransactions] = useState<any>([]);
  const [meta, setMeta] = useState<TableMeta>({ page: 1, take: 10 })
  const [filter, setFilter] = useState({ page: 1, take: 10, order: 'DESC' })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllTransactions(filter)
        // data.data has data and meta pagination
        setTransactions(data.data.data);
        setMeta(data.data.meta);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [filter])

  return (
    <TransactionContext.Provider value={{
      transactions,
      meta,
      filter,
      setFilter
    }}>
      <div className="mb-4 flex justify-between">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {/* create a new tab list with 3 tabs: value are "All", "Expenses" and "Income", control the tab with the state currentTab  */}
          <li className="me-2">
            <div className={`inline-block px-6 py-2 rounded ${currentTab === 0 ? `text-white bg-primary` : `text-black`} dark:text-white hover:opacity-90 cursor-pointer duration-300 ease-in-out`} onClick={() => setCurrentTab(0)}>All</div>
          </li>
          <li className="me-2">
            <div className={`inline-block px-6 py-2 rounded ${currentTab === 1 ? `text-white bg-primary` : `text-black`} dark:text-white hover:opacity-90 cursor-pointer duration-300 ease-in-out`} onClick={() => setCurrentTab(1)}>Expenses</div>
          </li>
          <li className="me-2">
            <div className={`inline-block px-6 py-2 rounded ${currentTab === 2 ? `text-white bg-primary` : `text-black`} dark:text-white hover:opacity-90 cursor-pointer duration-300 ease-in-out`} onClick={() => setCurrentTab(2)}>Income</div>
          </li>
        </ul>

        <Button asChild>
          <Link href="/transactions/create">Create new transaction</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={transactions} />
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useContext must be used within a Provider");
  }
  return context;
};

export default Transactions;