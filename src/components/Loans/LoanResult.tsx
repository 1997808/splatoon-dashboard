import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useLoansContext } from ".";
import { formatMoney } from "@/lib/utils";

const LoanResult = () => {
  const { loansResult } = useLoansContext();
  const { comment, ...mappedLoansResult } = loansResult
  return (
    <Card className="w-full flex flex-col rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
      <CardHeader>
        <CardTitle>Calculation details</CardTitle>
        <CardDescription>Salary Breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="pb-6">

        </div>
        <pre className="w-full whitespace-pre-line">
          {comment}
        </pre>
      </CardContent>
    </Card>
  )
}

export default LoanResult;
