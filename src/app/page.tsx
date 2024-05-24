import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import ContainerLayout from "@/components/Layouts/ContainerLayout";

export const metadata: Metadata = {
  title: "PineStats",
  description: "PineStats Dashboard",
};

export default function Home() {
  return (
    <>
      <ContainerLayout>
        <ECommerce />
      </ContainerLayout>
    </>
  );
}
