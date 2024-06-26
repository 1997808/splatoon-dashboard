"use client";
import React from "react";
import GoalsCard, { GoalsCardProps } from "@/components/Goals/GoalsCard";
import SavingCard from "@/components/Goals/SavingsCard";
import SavingsSummaryChart from "@/components/Goals/SavingsSummaryChart";

const Goals: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 md:col-span-4 h-full">
          <SavingCard
            target={"20000"}
            targetAchived={"12500"}
          />
        </div>
        <div className="col-span-12 md:col-span-8 h-full">
          <SavingsSummaryChart />
        </div>
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
