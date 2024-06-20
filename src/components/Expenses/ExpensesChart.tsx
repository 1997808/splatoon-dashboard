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
            borderRadius: 0,
            columnWidth: "25%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 4,
      columnWidth: "70%",
      borderRadiusApplication: 'end'
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 4,
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

    markers: {
      width: 16,
      height: 8,
      radius: 2,
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
    <div className="col-span-12 rounded-lg border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Expenses comparison
        </h4>
      </div>

      <div>
        <div id="expensesChart" className="-mb-9 -ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={300}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpensesChart;
