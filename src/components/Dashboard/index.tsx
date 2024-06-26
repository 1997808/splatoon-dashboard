"use client";
import React from "react";
import TotalCard from "@/components/Dashboard/TotalCard";
import SavingCard from "@/components/Dashboard/SavingsCard";
import UpcomingBillsTable from "@/components/Dashboard/UpcomingBill";
import './embla.css'
import TransactionsTable from "@/components/Dashboard/TransactionsTable";
import ExpensesChart from "@/components/Dashboard/ExpensesChart";
import ExpensesBreakdown from "@/components/Dashboard/ExpensesBreakdown";

const Overview: React.FC = () => {
  let total = 0
  const balances = []
  for (let i = 0; i < 7; i++) {
    const value = Math.floor(Math.random() * 5000)
    total += value
    balances.push({
      id: i,
      title: ['Credit Card', 'Debit Card', 'Savings', 'Checking'][Math.floor(Math.random() * 4)],
      accountNumber: `**** **** **** ${Math.floor(Math.random() * 10000)}`,
      totalAmount: `$${value}`,
    });
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <TotalCard
          title={`$${total}`}
          data={balances}
        />
        <SavingCard targetAchived={"12500"} target={"20000"} />
        <UpcomingBillsTable />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-4">
          <TransactionsTable />
        </div>

        <div className="col-span-12 xl:col-span-8 flex flex-col gap-4 md:gap-8">
          <ExpensesChart />
          <ExpensesBreakdown />
        </div>
      </div>
    </>
  );
};

export default Overview;
