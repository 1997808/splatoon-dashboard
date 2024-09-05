"use client"
import React, { createContext, useContext, useState } from "react";
import VNTaxForm from "@/components/Taxes/VNTaxForm";
import TaxResult from "@/components/Taxes/TaxResult";

export type ContextProps = {
  taxesResult: {
    grossSalary: any,
    socialInsurance: any,
    healthInsurance: any,
    unemployedInsurance: any,
    taxDeductions: any,
    personalIncomeTax: any
    netSalary: any,
    comment?: string
  }
  setTaxesResult: React.Dispatch<React.SetStateAction<any>>
};

const TaxesContext = createContext<ContextProps>({ taxesResult: { grossSalary: 0, socialInsurance: 0, healthInsurance: 0, unemployedInsurance: 0, taxDeductions: 0, personalIncomeTax: 0, netSalary: 0, comment: "" }, setTaxesResult: () => { } })

const Taxes: React.FC = () => {
  const [taxesResult, setTaxesResult] = useState({
    grossSalary: 0,
    socialInsurance: 0,
    healthInsurance: 0,
    unemployedInsurance: 0,
    taxDeductions: 0,
    personalIncomeTax: 0,
    netSalary: 0,
    comment: ""
  })

  return (
    <TaxesContext.Provider value={{ taxesResult, setTaxesResult }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="col-span-1">
          <VNTaxForm />
        </div>
        <TaxResult />
      </div>
    </TaxesContext.Provider>
  );
};


export const useTaxesContext = () => {
  const context = useContext(TaxesContext);
  if (!context) {
    throw new Error("useContext must be used within a Provider");
  }
  return context;
};

export default Taxes;