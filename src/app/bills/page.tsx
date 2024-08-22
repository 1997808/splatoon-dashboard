import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import Bills from "@/components/Bills";
import BillsTable from "@/components/Bills/page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PineStats",
  description: "PineStats",
};

const BillsPage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="mb-4 flex justify-between">
        <div></div>
        <Button asChild>
          <Link href="/bills/create">Create new bill</Link>
        </Button>
      </div>
      {/* <Bills /> */}
      <BillsTable />
    </DefaultLayout>
  );
};

export default BillsPage;
