/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { DatePickerDemo } from "@/components/Poi/DatePicka";
import TransactionsPoi from "@/components/Poi/TransactionsPoi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { formatMoney } from "@/lib/utils";
import dayjs from "dayjs";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { usePoiContext } from ".";

const PoiForm: React.FC = () => {
  const { category, selectedType, setSelectedType, selectedCategory, setSelectedCategory, date, setDate, itemList, addItemResult, itemSelected, itemIndexSelected } = usePoiContext();
  const [list, setList] = useState(itemList)
  // const [selectedType, setSelectedType] = useState("Expense")
  // const [date, setDate] = useState<Date>(dayjs().toDate())
  // const [selectedCategory, setSelectedCategory] = useState()

  useEffect(() => {
    if (!date)
      setDate(dayjs().toDate())
  }, [date])

  useEffect(() => {
    if (category.length > 0)
      setSelectedCategory(category[0]?.id)
  }, [category])

  useEffect(() => {
    setList(itemList.filter((item: any) => item.category === selectedCategory && item.type === selectedType.toLowerCase()))
  }, [itemList, selectedCategory, selectedType])

  return (
    <>
      <Card className="xl:max-w-screen-md w-full h-screen mx-auto rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
        <CardContent className="flex flex-col h-full gap-4 pt-6">
          <div className="flex justify-between items-start">
            <div className="flex gap-1">
              {["Expense", "Income", "Debt"].map((item, index) => (
                <Button key={item} className="" variant={item === selectedType ? "default" : "ghost"} onClick={() => setSelectedType(item)}>{item}</Button>
              ))}
            </div>
            <DatePickerDemo date={date} setDate={setDate} />
          </div>
          <div className="flex gap-1 flex-wrap">
            {category.map((item, index) => (
              <Button key={item.id} className="" variant={item.id === selectedCategory ? "default" : "ghost"} onClick={() => setSelectedCategory(item.id)}>{item.name}</Button>
            ))}
          </div>
          {itemIndexSelected !== null ? (
            <TransactionsPoi />
          ) : (
            <div className="grid grid-cols-4 gap-2 h-full overflow-y-scroll pr-2">
              <Card className="w-full aspect-square flex justify-center items-center bg-white hover:bg-stone-50 duration-150 cursor-pointer p-4"><Plus /></Card>
              {list.map((item, index) => (
                <Card key={item.id} className="w-full aspect-square flex flex-col justify-between items-center bg-white hover:bg-stone-100 duration-150 cursor-pointer p-4" onClick={() => addItemResult(item)}>
                  <p className="text-xs">{item.category ? category.find((c) => c.id === item.category)?.name : ""}</p>
                  <p className="text-base">{item.item}</p>
                  <p className="text-xs">{formatMoney(item.amount)}</p>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default PoiForm;
