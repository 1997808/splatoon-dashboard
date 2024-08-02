import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import TransactionsAdd from "@/components/TransactionsAdd";

export const metadata: Metadata = {
  title: "PineStats",
  description: "PineStats",
};

const TransactionAddPage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="w-full flex justify-center items-center">
        <TransactionsAdd />
      </div>
    </DefaultLayout>
  );
};

export default TransactionAddPage;