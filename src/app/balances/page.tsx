import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import Balances from "@/components/Balances";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PineStats",
  description: "PineStats",
};

const BalancesPage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="mb-4 flex justify-between">
        <div></div>
        <Button asChild>
          <Link href="/balances/create">Create new balance</Link>
        </Button>
      </div>
      <Balances />
    </DefaultLayout>
  );
};

export default BalancesPage;
