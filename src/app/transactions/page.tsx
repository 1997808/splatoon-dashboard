import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import Transactions from "@/components/Transactions/page";

export const metadata: Metadata = {
  title: "PineStats",
  description: "PineStats",
};

const TransactionPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Transactions />
    </DefaultLayout>
  );
};

export default TransactionPage;
