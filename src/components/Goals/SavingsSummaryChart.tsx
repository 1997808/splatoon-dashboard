'use client'

import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const options: ApexOptions = {
  colors: ["#3C50E0"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "area",
    height: 335,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",
    itemMargin: {
      horizontal: 16,
    },
  },
};

interface SavingsSummaryChartState {
  series: {
    name: string;
    data: number[];
  }[];
}

const SavingsSummaryChart: React.FC = () => {
  const [state, setState] = useState<SavingsSummaryChartState>({
    series: [
      {
        name: "This Year",
        data: [1000, 1200, 1500, 1500, 2000, 2500, 2000, 2500, 3000, 4500, 5000, 5600]
      },
    ],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="relative rounded-lg border border-stroke bg-white p-6 shadow-lg dark:border-strokedark dark:bg-boxdark">
      <h4 className="md:absolute text-lg font-bold text-black dark:text-white">
        Assets Summary
      </h4>

      <div id="SavingsSummaryChart" className="mt-6 -mb-6 -ml-4">
        <ReactApexChart
          options={options}
          series={state.series}
          type="area"
          height={250}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default SavingsSummaryChart;
