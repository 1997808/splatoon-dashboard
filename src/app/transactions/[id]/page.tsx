import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import TransactionsUpdate from "@/components/TransactionsUpdate";

export const metadata: Metadata = {
  title: "PineStats",
  description: "PineStats",
};

const TransactionsUpdatePage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="w-full flex justify-center items-center">
        <TransactionsUpdate />
      </div>
    </DefaultLayout>
  );
};

export default TransactionsUpdatePage;