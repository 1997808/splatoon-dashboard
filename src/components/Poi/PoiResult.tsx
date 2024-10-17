import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { formatMoney } from "@/lib/utils";
import { CopyIcon, XIcon } from "lucide-react";
import { usePoiContext } from ".";

const PoiResult = () => {
  const { category, itemResult, deleteItemResult } = usePoiContext();
  return (
    <Card className="w-full h-full flex flex-col rounded-none border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
      <CardContent className="pt-6 h-screen flex flex-col justify-between">
        <div className="overflow-y-scroll pr-4">
          {itemResult.map((item, index) => (
            <div
              key={index}
              className="flex justify-between px-2 py-4 border-b border-stroke dark:border-strokedark"
            >
              <div className="flex flex-col justify-between gap-2">
                <div className="flex justify-start items-center gap-1">
                  <div className="flex justify-center items-center rounded p-1 bg-white hover:bg-stone-100 duration-150 cursor-pointer">
                    <CopyIcon size={12} />
                  </div>
                  <p className="text-sm font-medium leading-6">
                    {item.item}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 items-center text-xs">
                  <Badge variant="outline">{item.type}</Badge>
                  <Badge variant="outline">{item.category ? category.find((c) => c.id === item.category)?.name : ""}</Badge>
                </div>
              </div>
              <div className="flex flex-col justify-between items-end">
                <div className="flex justify-center items-center rounded p-1 bg-white hover:bg-rose-500 hover:text-white duration-150 cursor-pointer" onClick={() => deleteItemResult(index)}>
                  <XIcon size={14} />
                </div>
                <p className="text-xs">
                  {formatMoney(item.amount)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="">
          <Button className="mt-4 w-full" variant={"secondary"}>Add new</Button>
          <Button className="mt-4 w-full" variant={"secondary"}>Save draft</Button>
          <Button className="mt-4 w-full">Submit</Button>
        </div>
      </CardContent>
    </Card>
  )
}

const demoData = [
  {
    "id": 52,
    "item": "Spotify",
    "description": "Monthly Music Tax",
    "amount": 60001,
    "type": "expense",
    "balance": {
      "id": 1,
      "sourceName": "Cash",
      "accountNumber": "null",
      "balanceAmount": 469000,
      "currency": "VND",
      "user": 5,
      "lastUpdated": "2024-08-09T09:56:16.321Z",
      "description": "absolute classic"
    },
    "user": 5,
    "category": 10,
    "transactionDate": "2024-10-10T17:00:00.000Z"
  },
  {
    "id": 54,
    "item": "Đào cam sả",
    "description": "Aha coffee",
    "amount": 50000,
    "type": "expense",
    "balance": {
      "id": 2,
      "sourceName": "TCB",
      "accountNumber": "4015",
      "balanceAmount": 1400000,
      "currency": "VND",
      "user": 5,
      "lastUpdated": "2024-08-09T08:46:38.399Z",
      "description": "Techcombank"
    },
    "user": 5,
    "category": 3,
    "transactionDate": "2024-10-10T17:00:00.000Z"
  },
  {
    "id": 49,
    "item": "Working",
    "description": "",
    "amount": 22000000,
    "type": "income",
    "balance": {
      "id": 2,
      "sourceName": "TCB",
      "accountNumber": "4015",
      "balanceAmount": 1400000,
      "currency": "VND",
      "user": 5,
      "lastUpdated": "2024-08-09T08:46:38.399Z",
      "description": "Techcombank"
    },
    "user": 5,
    "category": 6,
    "transactionDate": "2024-10-10T17:00:00.000Z"
  },
]

export default PoiResult;
