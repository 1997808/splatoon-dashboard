import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import BillsUpdate from "@/components/BillsUpdate";

export const metadata: Metadata = {
  title: "PineStats",
  description: "PineStats",
};

const BillsUpdatePage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="w-full flex justify-center items-center">
        <BillsUpdate />
      </div>
    </DefaultLayout>
  );
};

export default BillsUpdatePage;