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
        data: [2000, 1500, 1000, 500, 2000, 1500, 1000, 500, 2000, 1500, 1000, 500]
      },
      {
        name: "This Year",
        data: [1823, 945, 467, 500, 3535, 245]
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
        Savings Summary
      </h4>

      <div id="SavingsSummaryChart" className="-mb-6 -ml-4">
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
