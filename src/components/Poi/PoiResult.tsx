/* eslint-disable react-hooks/exhaustive-deps */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { formatMoney } from "@/lib/utils";
import { CopyIcon, XIcon } from "lucide-react";
import { useEffect } from "react";
import { usePoiContext } from ".";

const PoiResult = () => {
  const { category, balances, selectedBalance, setSelectedBalance, itemResult, itemSelected, setItemSelected, itemIndexSelected, setItemIndexSelected, updateItemResult, deleteItemResult } = usePoiContext();

  useEffect(() => {
    if (balances.length > 0)
      setSelectedBalance(balances[0]?.id)
  }, [balances])

  return (
    <Card className="w-full h-full flex flex-col rounded-none border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
      <CardContent className="pt-6 h-screen flex flex-col justify-between">
        <div className="overflow-y-scroll pr-4">
          {itemResult.map((item, index) => (
            <div
              key={index}
              className={`flex justify-between gap-2 px-2 py-4 border-l-4 ${itemIndexSelected === index ? "border-l-primary" : "border-l-transparent"} border-b border-b-stroke dark:border-b-strokedark`}
              onClick={() => {
                if (index === itemIndexSelected) {
                  setItemIndexSelected(null)
                  setItemSelected({})
                } else {
                  setItemIndexSelected(index)
                  setItemSelected(item)
                }
              }}
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
                  {item.type && <Badge variant="outline" className="capitalize">{item.type}</Badge>}
                  {item.category && <Badge variant="outline">{item.category ? category.find((c) => c.id === item.category)?.name : ""}</Badge>}
                  {item.balance && <Badge variant="outline">{item.balance ? balances.find((b) => b.id === item.balance)?.sourceName : ""}</Badge>}
                </div>
              </div>
              <div className="flex flex-col justify-between items-end">
                {itemIndexSelected === null ? (
                  <div className="flex justify-center items-center rounded p-1 bg-white hover:bg-rose-500 hover:text-white duration-150 cursor-pointer" onClick={(e) => {
                    e.stopPropagation(); // Prevents item selection
                    deleteItemResult(index)
                  }}>
                    <XIcon size={14} />
                  </div>
                ) : <div></div>}
                <p className="text-xs pr-1">
                  {formatMoney(item.amount)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="flex gap-4 overflow-x-scroll pb-1">
            {balances.map((balance, index) => (
              <div
                key={index}
                className={`flex flex-col justify-between items-center gap-1 p-2 rounded duration-150 cursor-pointer ${selectedBalance === balance.id ? "bg-primary text-white" : "bg-white"}`}
                onClick={() => {
                  if (itemIndexSelected !== null) {
                    updateItemResult({ balance: balance?.id }, itemIndexSelected)
                  }
                  setSelectedBalance(balance?.id)
                }}
              >
                <p className="text-xs font-medium">
                  {balance.sourceName}
                </p>
                <p className="text-xs">
                  {formatMoney(balance.balanceAmount)}
                </p>
              </div>
            ))}
          </div>
          {itemIndexSelected === null ? <></> :
            (
              <Button className="mt-3 w-full" variant={"outline"} onClick={() => {
                setItemIndexSelected(null)
                setItemSelected({})
              }}>Deselect item</Button>
            )}
          <div className="flex gap-4">
            <Button className="mt-4 w-full" variant={"secondary"}>Save draft</Button>
            <Button className="mt-4 w-full">Submit</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PoiResult;
