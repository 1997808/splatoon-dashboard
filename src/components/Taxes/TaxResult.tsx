import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useTaxesContext } from ".";
import { convertToKeyValueArray } from "@/lib/taxUtils";
import { formatMoney } from "@/lib/utils";

const TaxResult = () => {
  const { taxesResult } = useTaxesContext();
  return (
    <Card className="w-full flex flex-col rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
      <CardHeader>
        <CardTitle>Calculation details</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {convertToKeyValueArray(taxesResult).map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-start pb-4 last:mb-0 last:pb-0"
            >
              <p className="text-sm">
                {item.key}
              </p>
              <p className="text-lg font-medium">
                {formatMoney(item.value) || 0}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default TaxResult;
