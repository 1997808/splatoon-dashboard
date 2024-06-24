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
        name: "Last Year",
        // create a demo value for each months in year so that the total sum = 21000
        data: [2000, 1500, 1000, 500, 2000, 1500, 1000, 500, 2000, 1500, 1000, 500]
      },
      {
        name: "This Year",
        // create a demo value for first 6 months in year so that the total sum = 12500
        data: [1823, 945, 467, 500, 3535, 245, 0, 0, 0, 0, 0, 0]
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
    <div className="relative rounded-lg border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="absolute mb-4 justify-between gap-4 sm:flex">
        <h4 className="text-sm font-semibold text-black dark:text-white">
          Savings Summary
        </h4>
      </div>

      <div id="SavingsSummaryChart" className="-mb-9 -ml-5">
        <ReactApexChart
          options={options}
          series={state.series}
          type="bar"
          height={250}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default SavingsSummaryChart;
