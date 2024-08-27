import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import BalancesUpdate from "@/components/BalancesUpdate";

export const metadata: Metadata = {
  title: "PineStats",
  description: "PineStats",
};

const BalanceUpdatePage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="w-full flex justify-center items-center">
        <BalancesUpdate />
      </div>
    </DefaultLayout>
  );
};

export default BalanceUpdatePage;