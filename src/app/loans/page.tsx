import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Loans from "@/components/Loans";

export const metadata: Metadata = {
  title: "PineStats",
  description: "PineStats",
};

const LoansPage = () => {
  return (
    <DefaultLayout>
      <Loans />
    </DefaultLayout>
  );
};

export default LoansPage;
