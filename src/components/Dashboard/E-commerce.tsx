"use client";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import TableFour from "../Tables/TableFour";
import CardDataStats from "../CardDataStats";
import MapOne from "../Maps/MapOne";
import { Eye, SquareUserRound, Timer, Waypoints } from "lucide-react";

const ECommerce: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Visitors" total="3.4K" rate="0.43%" levelUp>
          <SquareUserRound />
        </CardDataStats>
        <CardDataStats title="Pageviews" total="5.2K" rate="4.35%" levelUp>
          <Eye />
        </CardDataStats>
        <CardDataStats title="Visit time" total="1m 29s" rate="2.59%" levelUp>
          <Timer />
        </CardDataStats>
        <CardDataStats title="Bounce rate" total="34%" rate="0.95%" levelDown>
          <Waypoints />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-6">
          <TableFour />
        </div>
        <div className="col-span-12 xl:col-span-6">
          <TableFour />
        </div>
      </div>
    </>
  );
};

export default ECommerce;
