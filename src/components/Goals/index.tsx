"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { GoalsCardProps } from "@/components/Goals/GoalsCard";
import BudgetCard from "@/components/Goals/BudgetCard";
import SavingsSummaryChart from "@/components/Goals/SavingsSummaryChart";
import { getBudget } from "@/tools/budget";

const GoalContext = createContext({ budgetId: 0, budgetAmount: 0, totalExpenses: 0 })

const Goals: React.FC = () => {
  const [budgetId, setBudgetId] = useState(0)
  const [budgetAmount, setBudgetAmount] = useState(0)
  const [totalExpenses, setTotalExpenses] = useState(0)

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const data = await getBudget()
        const result = data.data
        setBudgetId(result?.id)
        setBudgetAmount(result?.budgetAmount)
        setTotalExpenses(result?.totalExpenses)
      } catch (error) {
        console.log(error);
      }
    }

    fetchBudget()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <GoalContext.Provider value={{
      budgetId,
      budgetAmount,
      totalExpenses
    }}>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 md:col-span-4 h-full">
          <BudgetCard />
        </div>
        <div className="col-span-12 md:col-span-8 h-full">
          <SavingsSummaryChart />
        </div>
        {/* {demoData.map((data: GoalsCardProps, key: number) => {
          return <GoalsCard key={key} {...data} />;
        })} */}
      </div>
    </GoalContext.Provider>
  );
};

const demoData: GoalsCardProps[] = [
  {
    category: 'housing',
    totalAmount: '5000',
  },
  {
    category: 'food',
    totalAmount: '1000',
  },
  {
    category: 'transportation',
    totalAmount: '1500',
  },
  {
    category: 'entertainment',
    totalAmount: '2000',
  },
  {
    category: 'shopping',
    totalAmount: '2500',
  },
  {
    category: 'others',
    totalAmount: '3000',
  },
];

export const useGoalContext = () => {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error("useContext must be used within a Provider");
  }
  return context;
};

export default Goals;
