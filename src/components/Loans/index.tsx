"use client"
import React, { createContext, useContext, useState } from "react";
import VNLoanForm from "@/components/Loans/VNLoanForm";
import LoanResult from "@/components/Loans/LoanResult";

export type ContextProps = {
  loansResult: {
    averagePayment: any,
    firstPayment: any,
    lastPayment: any,
    totalInterest: any,
    totalPayment: any
  }
  setLoansResult: React.Dispatch<React.SetStateAction<any>>
};

const LoansContext = createContext<ContextProps>({
  loansResult: {
    averagePayment: 0,
    firstPayment: 0,
    lastPayment: 0,
    totalInterest: 0,
    totalPayment: 0
  }, setLoansResult: () => { }
})

const Loans: React.FC = () => {
  const [loansResult, setLoansResult] = useState({
    averagePayment: 0,
    firstPayment: 0,
    lastPayment: 0,
    totalInterest: 0,
    totalPayment: 0,
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