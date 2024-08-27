import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import BillsCreate from "@/components/BillsCreate";

export const metadata: Metadata = {
  title: "PineStats",
  description: "PineStats",
};

const BillsCreatePage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="w-full flex justify-center items-center">
        <BillsCreate />
      </div>
    </DefaultLayout>
  );
};

export default BillsCreatePage;