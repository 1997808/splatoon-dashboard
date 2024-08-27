"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { columns } from "./Column"
import { DataTable } from "./DataTable"
import { getAllBills } from "@/tools/bill";
import { TableMeta } from "@/components/common/TableMeta";

export type ContextProps = {
  bills: any[];
  meta: TableMeta
  filter?: any;
  setFilter: React.Dispatch<React.SetStateAction<any>>;
};

const BillContext = createContext<ContextProps>({ bills: [], meta: { page: 1, take: 10 }, filter: {}, setFilter: () => { } })

const Bills: React.FC = () => {
  const [bills, setBills] = useState<any>([]);
  const [meta, setMeta] = useState<TableMeta>({ page: 1, take: 10 })
  const [filter, setFilter] = useState({ page: 1, take: 10 })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBills()
        setBills(data.data.data);
        setMeta(data.data.meta);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  return (
    <BillContext.Provider value={{
      bills,
      meta,
      filter,
      setFilter
    }}>
      <DataTable columns={columns} data={bills} />
    </BillContext.Provider>
  );
};

export const useBillContext = () => {
  const context = useContext(BillContext);
  if (!context) {
    throw new Error("useContext must be used within a Provider");
  }
  return context;
};

export default Bills;