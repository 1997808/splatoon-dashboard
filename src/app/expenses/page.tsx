import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import Expenses from "@/components/Expenses/page";

export const metadata: Metadata = {
  title: "PineStats",
  description: "PineStats",
};

const ExpensesPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Expenses />
    </DefaultLayout>
  );
};

export default ExpensesPage;
