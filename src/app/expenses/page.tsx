import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";

export const metadata: Metadata = {
  title: "PineStats",
  description: "PineStats",
};

const ExpensesPage: React.FC = () => {
  return (
    <DefaultLayout>
      <div></div>
    </DefaultLayout>
  );
};

export default ExpensesPage;
