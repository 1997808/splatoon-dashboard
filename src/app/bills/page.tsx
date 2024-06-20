import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import Bills from "@/components/Bills";

export const metadata: Metadata = {
  title: "PineStats",
  description: "PineStats",
};

const BillsPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Bills />
    </DefaultLayout>
  );
};

export default BillsPage;
