"use client"
import React, { useEffect, useState } from "react";
import BillsTable from "./Table";
import { getAllBills } from "@/tools/bill";

const Bills: React.FC = () => {
  const [bills, setBills] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBills()
        setBills(data.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  return (
    <>
      <BillsTable bills={bills} />
    </>
  );
};

export default Bills;
