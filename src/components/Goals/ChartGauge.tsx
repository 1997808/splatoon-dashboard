'use client'
import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const options: ApexOptions = {
  chart: {
    type: 'radialBar',
    offsetY: -8,
    sparkline: {
      enabled: true
    }
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: "#e7e7e7",
        strokeWidth: '97%',
      },
      dataLabels: {
        name: {
          show: false
        },
        value: {
          offsetY: -2,
          fontSize: "14px"
        }
      },
    }
  },
  fill: {
    colors: ["#3C50E0"],
  },
};

const ChartGauge: React.FC = () => {
  return (
    <>
      {(typeof window !== 'undefined') && (
        <ReactApexChart
          options={options}
          series={[57]}
          type="radialBar"
          height={200}
        />
      )}

      <div className="flex items-center justify-center">
        <h4 className="text-xs font-semibold dark:text-white">
          Target vs Achivement
        </h4>
      </div>
    </>
  );
};

export default ChartGauge;
