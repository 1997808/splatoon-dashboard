"use client"
import React, { useEffect, useState } from "react";
import { Payment, columns } from "./Column"
import { DataTable } from "./DataTable"
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
      <DataTable columns={columns} data={bills} />
    </>
  );
};

export default Bills;