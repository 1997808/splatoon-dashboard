import React from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { useLoansContext } from ".";
import { formatMoney } from "@/lib/utils";

const LoanResult = () => {
  const { loansResult } = useLoansContext();
  const { averagePayment, firstPayment, lastPayment, totalInterest, totalPayment } = loansResult
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="w-full flex flex-col rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark overflow-hidden">
        <CardContent className="bg-primary p-6 text-white">
          <div className="flex flex-col gap-6 w-full h-auto">
            <div>
              <p className="pb-2">Average payment amount</p>
              <p className="text-5xl font-semibold">{formatMoney(averagePayment)}</p>
            </div>
            {firstPayment && lastPayment && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p>First payment</p>
                  <p className="font-semibold">{formatMoney(firstPayment)}</p>
                </div>
                <div>
                  <p>Last payment</p>
                  <p className="font-semibold">{formatMoney(lastPayment)}</p>
                </div>
              </div>
            )}
            <div className="flex justify-between items-center">
              <p>Interest charged</p>
              <p className="font-semibold">{formatMoney(totalInterest)}</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Estimated total amount</p>
              <p className="font-semibold">{formatMoney(totalPayment)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoanResult;
