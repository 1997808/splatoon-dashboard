import React from "react";
import TotalCard from "./TotalCard";

const Balances: React.FC = () => {
  const balances = []
  // create a balances array random value for id accountNumber and totalAmount, title can be credit card or debit card or savings or checking
  for (let i = 0; i < 7; i++) {
    balances.push({
      id: i,
      title: ['Credit Card', 'Debit Card', 'Savings', 'Checking'][Math.floor(Math.random() * 4)],
      accountNumber: `**** **** **** ${Math.floor(Math.random() * 10000)}`,
      totalAmount: `$ ${Math.floor(Math.random() * 5000)}`,
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {balances.map((balance) => (
        <TotalCard
          key={balance.id}
          id={balance.id.toString()}
          title={balance.title}
          accountNumber={balance.accountNumber}
          totalAmount={balance.totalAmount}
        />
      ))}
    </div>
  );
};

export default Balances;
