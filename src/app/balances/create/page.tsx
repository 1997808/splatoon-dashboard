import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import BalancesCreate from "@/components/BalancesCreate";

export const metadata: Metadata = {
  title: "PineStats",
  description: "PineStats",
};

const BalanceCreatePage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="w-full flex justify-center items-center">
        <BalancesCreate />
      </div>
    </DefaultLayout>
  );
};

export default BalanceCreatePage;