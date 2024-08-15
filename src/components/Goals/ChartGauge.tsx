'use client'
import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";
import { useGoalContext } from ".";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const options: ApexOptions = {
  chart: {
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: "50%"
      },
      track: {
        background: "#e7e7e7",
        strokeWidth: '97%',
      },
      dataLabels: {
        show: false
      },
    }
  },
  stroke: {
    lineCap: "round",
  },
  fill: {
    colors: ["#3C50E0"],
  },
};

const ChartGauge: React.FC = () => {
  const { budgetAmount = 1, totalExpenses = 0 } = useGoalContext();
  const percentage = Math.floor(totalExpenses * 100 / budgetAmount)

  return (
    <>
      <ReactApexChart
        options={options}
        type="radialBar"
        series={[percentage]}
        width={"100%"}
        height={200}
      />

      <div className="flex items-center justify-center">
        <h4 className="text-xs font-semibold dark:text-white">
          Budget spent {percentage}%
        </h4>
      </div>
    </>
  );
};

export default ChartGauge;
