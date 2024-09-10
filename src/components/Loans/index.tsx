"use client"
import React, { createContext, useContext, useState } from "react";
import VNLoanForm from "@/components/Loans/VNLoanForm";
import LoanResult from "@/components/Loans/LoanResult";

export type ContextProps = {
  loansResult: {
    grossSalary: any,
    socialInsurance: any,
    healthInsurance: any,
    unemployedInsurance: any,
    taxDeductions: any,
    personalIncomeTax: any
    netSalary: any,
    comment?: string
  }
  setLoansResult: React.Dispatch<React.SetStateAction<any>>
};

const LoansContext = createContext<ContextProps>({ loansResult: { grossSalary: 0, socialInsurance: 0, healthInsurance: 0, unemployedInsurance: 0, taxDeductions: 0, personalIncomeTax: 0, netSalary: 0, comment: "" }, setLoansResult: () => { } })

const Loans: React.FC = () => {
  const [loansResult, setLoansResult] = useState({
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
    <LoansContext.Provider value={{ loansResult, setLoansResult }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="col-span-1">
          <VNLoanForm />
        </div>
        <LoanResult />
      </div>
    </LoansContext.Provider>
  );
};


export const useLoansContext = () => {
  const context = useContext(LoansContext);
  if (!context) {
    throw new Error("useContext must be used within a Provider");
  }
  return context;
};

export default Loans;