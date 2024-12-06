import Balances from "@/components/Balances";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

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
          <Link href="/balances/create" prefetch={false}>Create new balance</Link>
        </Button>
      </div>
      <Balances />
    </DefaultLayout>
  );
};

export default BalancesPage;
