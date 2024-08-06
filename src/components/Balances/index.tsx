"use client"
import React, { useEffect, useState } from "react";
import TotalCard from "./TotalCard";
import { getAllBalances } from "@/tools/balance";

const Balances: React.FC = () => {
  const [balances, setBalances] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBalances()
        setBalances(data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {balances.map((balance: any) => (
        <TotalCard
          key={balance.id}
          id={balance.id.toString()}
          sourceName={balance.sourceName}
          accountNumber={balance.accountNumber}
          balanceAmount={balance.balanceAmount}
        />
      ))}
    </div>
  );
};

export default Balances;
