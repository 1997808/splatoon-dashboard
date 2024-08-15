"use client";
import ExpensesChart from "@/components/Expenses/ExpensesChart";
import React, { useEffect, useState } from "react";
import ExpensesCard, { ExpensesCardProps } from "@/components/Expenses/ExpensesCard";
import { getMonthlyCategory } from "@/tools/transaction";

const Expenses: React.FC = () => {
  const [overview, setOverview] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMonthlyCategory()
        setOverview(data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <ExpensesChart />
        {overview.map((data: ExpensesCardProps, key: number) => {
          return <ExpensesCard key={key} {...data} />;
        })}
      </div>
    </>
  );
};

const demoData: ExpensesCardProps[] = [
  {
    category: 'housing',
    changeAmount: '-10',
    totalAmount: 5000,
    data: [
      { id: 1, item: 'Rent', amount: 2000, createdDate: '2022-01-01' },
      { id: 2, item: 'Utilities', amount: 300, createdDate: '2022-01-02' },
      // add more housing expenses here
    ],
  },
  {
    category: 'food',
    changeAmount: '8',
    totalAmount: 1000,
    data: [
      { id: 3, item: 'Groceries', amount: 500, createdDate: '2022-01-03' },
      { id: 4, item: 'Dining out', amount: 500, createdDate: '2022-01-04' },
      // add more food expenses here
    ],
  },
  {
    category: 'transportation',
    changeAmount: '20',
    totalAmount: 1500,
    data: [
      { id: 5, item: 'Gas', amount: 500, createdDate: '2022-01-05' },
      { id: 6, item: 'Public transport', amount: 1000, createdDate: '2022-01-06' },
      // add more transportation expenses here
    ],
  },
  {
    category: 'entertainment',
    changeAmount: '-2',
    totalAmount: 2000,
    data: [
      { id: 7, item: 'Movies', amount: 1000, createdDate: '2022-01-07' },
      { id: 8, item: 'Concerts', amount: 1000, createdDate: '2022-01-08' },
      // add more entertainment expenses here
    ],
  },
  {
    category: 'shopping',
    changeAmount: '20',
    totalAmount: 2500,
    data: [
      { id: 9, item: 'Clothes', amount: 1250, createdDate: '2022-01-09' },
      { id: 10, item: 'Electronics', amount: 1250, createdDate: '2022-01-10' },
      // add more shopping expenses here
    ],
  },
  {
    category: 'others',
    changeAmount: '-19',
    totalAmount: 3000,
    data: [
      { id: 11, item: 'Miscellaneous', amount: 1500, createdDate: '2022-01-11' },
      { id: 12, item: 'Other', amount: 1500, createdDate: '2022-01-12' },
      // add more other expenses here
    ],
  },
];

export default Expenses;
