import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import Balances from "@/components/Balances";

export const metadata: Metadata = {
  title: "PineStats",
  description: "PineStats",
};

const BalancesPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Balances />
    </DefaultLayout>
  );
};

export default BalancesPage;
