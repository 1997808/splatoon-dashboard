"use client";
import React from "react";
import GoalsCard, { GoalsCardProps } from "@/components/Goals/GoalsCard";

const Goals: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        {demoData.map((data: GoalsCardProps, key: number) => {
          return <GoalsCard key={key} {...data} />;
        })}
      </div>
    </>
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

export default Goals;
