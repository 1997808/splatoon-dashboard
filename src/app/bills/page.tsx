import BillsTable from "@/components/Bills";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

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
          <Link href="/bills/create" prefetch={false}>Create new bill</Link>
        </Button>
      </div>
      <BillsTable />
    </DefaultLayout>
  );
};

export default BillsPage;
