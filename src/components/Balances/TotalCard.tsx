import Link from "next/link";
import React, { ReactElement } from "react";

// create an TotalCard props interface
export interface TotalCardProps {
  id: string;
  data: DataProps
}

export interface DataProps {
  id: string;
  sourceName: string;
  accountNumber: string;
  balanceAmount: number;
  currency: string;
  description: string;
}

// const TotalCard: (props: TotalCardProps) => ReactElement = ({ id, sourceName, accountNumber, balanceAmount }: TotalCardProps) => {
//   return (
//     <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
//       <div className="border-b border-stroke px-6 pt-6 pb-4 dark:border-strokedark">
//         <h3 className="font-bold text-black dark:text-white text-sm">
//           {sourceName || "Credit Card"}
//         </h3>
//       </div>
//       <div className="p-6 pt-4">
//         <div className="mb-4 flex flex-col items-start gap-3">
//           {accountNumber && (
//             <div className="flex flex-col">
//               <p className="text-black dark:text-white font-bold text-xl">
//                 {"**** **** **** " + accountNumber.slice(-4)}
//               </p>
//               <p className="text-neutral-600 dark:text-gray text-sm">Account number</p>
//             </div>
//           )}

//           <div className="flex flex-col">
//             <p className="text-black dark:text-white font-bold text-xl">
//               {balanceAmount}
//             </p>
//             <p className="text-neutral-500 dark:text-gray text-sm">Total amount</p>
//           </div>
//         </div>

//         <div className="flex justify-end gap-4.5">
//           <Link href={`/balances/${id}`}>
//             <button
//               className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-sm text-gray hover:bg-opacity-90"
//               type="submit"
//             >
//               Detail
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatMoney } from "@/lib/utils";

const TotalCard: (props: TotalCardProps) => ReactElement = ({ data }: TotalCardProps) => {
  const { id, sourceName, accountNumber, balanceAmount, description, currency } = data
  return (
    <Card className="w-full flex flex-col rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
      <CardHeader>
        <CardTitle>
          <h3 className="font-bold text-black dark:text-white text-base">
            {sourceName}
          </h3>
        </CardTitle>
        <CardDescription className="m-0 text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow h-full justify-between">
        <div className="mb-4 flex flex-col items-start gap-3">
          {accountNumber && accountNumber !== 'null' && (
            <div className="flex flex-col">
              <p className="text-black dark:text-white font-bold text-xl">
                {"**** **** **** " + accountNumber.slice(-4)}
              </p>
              <p className="text-neutral-600 dark:text-gray text-sm">Account number</p>
            </div>
          )}

          <div className="flex flex-col">
            <p className="text-black dark:text-white font-bold text-xl">
              {formatMoney(balanceAmount)} {currency}
            </p>
            <p className="text-neutral-500 dark:text-gray text-sm">Current amount</p>
          </div>
        </div>
        <div className="flex justify-end gap-4.5">
          <Link href={`/balances/${id}`}>
            <Button variant="default">Edit</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}


export default TotalCard;
