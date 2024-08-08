import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const options: ApexOptions = {
  colors: ["#80CAEE", "#3C50E0"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "bar",
    height: 335,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 4,
            columnWidth: "90%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 4,
      columnWidth: "90%",
      borderRadiusApplication: 'end'
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 1,
    colors: ["transparent"],
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
  fill: {
    opacity: 1,
  },
};

interface ExpensesChartState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ExpensesChart: React.FC = () => {
  const [state, setState] = useState<ExpensesChartState>({
    series: [
      {
        name: "Last Year",
        data: [44, 55, 41, 67, 22, 43, 65, 76, 45, 33, 55, 41],
      },
      {
        name: "This Year",
        data: [13, 23, 20, 8, 13, 27, 15],
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
    <div className="relative col-span-12 rounded-lg border border-stroke bg-white p-6 shadow-lg dark:border-strokedark dark:bg-boxdark">
      <h4 className="md:absolute text-lg font-bold text-black dark:text-white">
        Expenses comparison
      </h4>

      <div id="expensesChart" className="-mb-6 -ml-4">
        <ReactApexChart
          options={options}
          series={state.series}
          type="bar"
          height={300}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default ExpensesChart;
