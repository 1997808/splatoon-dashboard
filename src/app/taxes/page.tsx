import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Taxes from "@/components/Taxes";

export const metadata: Metadata = {
  title: "PineStats",
  description: "PineStats",
};

const TaxesPage = () => {
  return (
    <DefaultLayout>
      <Taxes />
    </DefaultLayout>
  );
};

export default TaxesPage;
