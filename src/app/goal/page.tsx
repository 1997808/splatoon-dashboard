import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import Goals from "@/components/Goals";

export const metadata: Metadata = {
  title: "PineStats",
  description: "PineStats",
};

const GoalPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Goals />
    </DefaultLayout>
  );
};

export default GoalPage;
