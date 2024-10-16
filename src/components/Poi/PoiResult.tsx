import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { formatMoney } from "@/lib/utils";
import { usePoiContext } from ".";

const PoiResult = () => {
  const { poiResult } = usePoiContext();
  return (
    <Card className="w-full h-full flex flex-col rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
      <CardContent className="pt-6 max-h-screen flex flex-col justify-between">
        <div className="overflow-y-scroll">
          {demoData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-end py-4 pr-4 border-b border-stroke dark:border-strokedark"
            >
              <p className="text-sm leading-6">
                {item.item}
              </p>
              <p className="text-sm font-medium">
                {formatMoney(item.amount)}
              </p>
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
    "id": 51,
    "item": "Nippon Language",
    "description": "Nui Truc",
    "amount": 2000000,
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
    "category": 9,
    "transactionDate": "2024-10-10T17:00:00.000Z"
  },
  {
    "id": 50,
    "item": "Classical Musiz",
    "description": "Big Song House",
    "amount": 250000,
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
    "category": 10,
    "transactionDate": "2024-10-10T17:00:00.000Z"
  },
  {
    "id": 53,
    "item": "Popeyes",
    "description": "Chicken",
    "amount": 230000,
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
  {
    "id": 48,
    "item": "Borgar",
    "description": "",
    "amount": 100000,
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
    "category": 3,
    "transactionDate": "2024-10-07T17:00:00.000Z"
  },
  {
    "id": 47,
    "item": "Hostel",
    "description": "",
    "amount": 700000,
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
    "category": 1,
    "transactionDate": "2024-09-04T17:00:00.000Z"
  },
  {
    "id": 46,
    "item": "Sushi",
    "description": "",
    "amount": 120000,
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
    "category": 3,
    "transactionDate": "2024-09-04T17:00:00.000Z"
  },
  {
    "id": 40,
    "item": "Renting",
    "description": "",
    "amount": 3000,
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
    "category": 1,
    "transactionDate": "2024-08-18T17:00:00.000Z"
  }
]

export default PoiResult;
