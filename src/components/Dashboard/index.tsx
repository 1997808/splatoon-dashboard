"use client";
import React, { useEffect, useState } from "react";
import TotalCard from "@/components/Dashboard/TotalCard";
import SavingCard from "@/components/Dashboard/SavingsCard";
import UpcomingBillsTable from "@/components/Dashboard/UpcomingBill";
import './embla.css'
import TransactionsTable from "@/components/Dashboard/TransactionsTable";
import ExpensesChart from "@/components/Dashboard/ExpensesChart";
import ExpensesBreakdown from "@/components/Dashboard/ExpensesBreakdown";
import { getAllBalances } from "@/tools/balance";
import { formatMoney } from "@/lib/utils";

const Overview: React.FC = () => {
  const [balances, setBalances] = useState([])
  const [total, setTotal] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBalances()
        setBalances(data.data);
        let tempTotal = 0
        data.data.map((item: any) => {
          tempTotal += item.balanceAmount
        });
        setTotal(tempTotal)
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])


  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        <TotalCard
          title={`${formatMoney(total)}`}
          data={balances}
        />
        <SavingCard targetAchived={"12500"} target={"20000"} />
        <UpcomingBillsTable />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5">
        <div className="col-span-12 xl:col-span-4">
          <TransactionsTable />
        </div>

        <div className="col-span-12 xl:col-span-8 flex flex-col gap-4 md:gap-6">
          <ExpensesChart />
          <ExpensesBreakdown />
        </div>
      </div>
    </>
  );
};

export default Overview;
