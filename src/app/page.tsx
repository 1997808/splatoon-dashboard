import Overview from "@/components/Dashboard";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "PineStats",
  description: "PineStats Dashboard",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Overview />
      </DefaultLayout>
    </>
  );
}
