"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import TotalCard from "@/components/Dashboard/TotalCard";
import UpcomingBillsTable from "@/components/Dashboard/UpcomingBill";
import './embla.css'
import TransactionsTable from "@/components/Dashboard/TransactionsTable";
import ExpensesChart from "@/components/Dashboard/ExpensesChart";
import ExpensesBreakdown from "@/components/Dashboard/ExpensesBreakdown";
import { getAllBalances } from "@/tools/balance";
import { getAllBills } from "@/tools/bill";
import { getBudget } from "@/tools/budget";
import BudgetCard from "./BudgetCard";

type ContextProps = {
  balances: any[];
  total: number;
  bills: any[];
  budgetAmount: number;
  totalExpenses: number;
  filter?: any;
  setFilter?: React.Dispatch<React.SetStateAction<any>>;
};

const OverviewContext = createContext<ContextProps>({ balances: [], total: 0, bills: [], budgetAmount: 0, totalExpenses: 0 })

const Overview: React.FC = () => {
  const [balances, setBalances] = useState([])
  const [bills, setBills] = useState([]);
  const [total, setTotal] = useState(0);
  const [budgetAmount, setBudgetAmount] = useState(0)
  const [totalExpenses, setTotalExpenses] = useState(0)

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const data = await getBudget()
        const result = data.data
        setBudgetAmount(result?.budgetAmount)
        setTotalExpenses(result?.totalExpenses)
      } catch (error) {
        console.log(error);
      }
    }

    fetchBudget()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBills({ take: 2 })
        setBills(data.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  return (
    <OverviewContext.Provider value={{ balances, total, bills, budgetAmount, totalExpenses }}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        <TotalCard />
        <BudgetCard />
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
    </OverviewContext.Provider>
  );
};

export const useOverviewContext = () => {
  const context = useContext(OverviewContext);
  if (!context) {
    throw new Error("useContext must be used within a Provider");
  }
  return context;
};


export default Overview;
