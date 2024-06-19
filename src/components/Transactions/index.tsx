"use client"
import React, { useState } from "react";
import TransactionsTable from "./Table";

const Transactions: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <>
      <div className="mb-4">
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
      </div>

      <TransactionsTable />
    </>
  );
};

export default Transactions;
