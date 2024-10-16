"use client"
import PoiForm from "@/components/Poi/PoiForm";
import PoiResult from "@/components/Poi/PoiResult";
import React, { createContext, useContext, useState } from "react";

export type ContextProps = {
  poiResult: {
    grossSalary: any,
    socialInsurance: any,
    healthInsurance: any,
    unemployedInsurance: any,
    poiDeductions: any,
    personalIncomePoi: any
    netSalary: any,
    comment?: string
  }
  setPoiResult: React.Dispatch<React.SetStateAction<any>>
};

const PoiContext = createContext<ContextProps>({ poiResult: { grossSalary: 0, socialInsurance: 0, healthInsurance: 0, unemployedInsurance: 0, poiDeductions: 0, personalIncomePoi: 0, netSalary: 0, comment: "" }, setPoiResult: () => { } })

const Poi: React.FC = () => {
  const [poiResult, setPoiResult] = useState({
    grossSalary: 0,
    socialInsurance: 0,
    healthInsurance: 0,
    unemployedInsurance: 0,
    poiDeductions: 0,
    personalIncomePoi: 0,
    netSalary: 0,
    comment: ""
  })

  return (
    <PoiContext.Provider value={{ poiResult, setPoiResult }}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-screen">
        <div className="col-span-2">
          <PoiForm />
        </div>
        <PoiResult />
      </div>
    </PoiContext.Provider>
  );
};


export const usePoiContext = () => {
  const context = useContext(PoiContext);
  if (!context) {
    throw new Error("useContext must be used within a Provider");
  }
  return context;
};

export default Poi;