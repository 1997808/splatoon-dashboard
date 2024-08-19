'use client'

import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useOverviewContext } from ".";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ExpensesPieState {
  series: number[];
}

const ExpensesPie: React.FC = () => {
  const { expenses } = useOverviewContext()
  const [state, setState] = useState<ExpensesPieState>({
    series: expenses.map((item) => parseInt(item.total_amount))
  });

  const options: ApexOptions = {
    chart: {
      type: 'pie',
      width: "100%",
      height: 240
    },
    labels: expenses.map((item) => item.category_name),
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="relative col-span-12 rounded-lg border border-stroke bg-white p-6 shadow-lg dark:border-strokedark dark:bg-boxdark">
      <h4 className="md:absolute text-lg font-bold text-black dark:text-white">
        Expenses breakdown
      </h4>

      {expenses && expenses.length > 0 && (
        <div id="expensesChart" className="mt-8">
          <ReactApexChart
            options={options}
            series={state.series}
            width={"100%"}
            height={240}
            type="pie"
          />
        </div>
      )}
    </div>
  );
};

export default ExpensesPie;
