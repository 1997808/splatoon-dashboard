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
import { TransactionType } from "@/types/transaction";
import dayjs from "dayjs";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { usePoiContext } from ".";

const PoiForm: React.FC = () => {
  const { category, selectedBalance, selectedType, setSelectedType, selectedCategory, setSelectedCategory, date, setDate, itemList, addItemResult, updateItemResult, itemSelected, itemIndexSelected } = usePoiContext();
  const [list, setList] = useState(itemList)

  useEffect(() => {
    if (!date)
      setDate(dayjs().toDate())
  }, [date])

  useEffect(() => {
    if (category.length > 0)
      setSelectedCategory(category[0]?.id)
  }, [category])

  useEffect(() => {
    if (itemIndexSelected !== null) {
      return
    }
    setList(itemList.filter((item: any) => item.category === selectedCategory && item.type === selectedType.toLowerCase()))
  }, [itemList, selectedCategory, selectedType])

  const updateDate = (date: Date) => {
    if (itemIndexSelected !== null) {
      updateItemResult({ transactionDate: date }, itemIndexSelected)
    }
    setDate(date)
  }

  return (
    <>
      <Card className="xl:max-w-screen-md w-full h-screen mx-auto rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
        <CardContent className="flex flex-col h-full gap-4 pt-6">
          <div className="flex justify-between items-start">
            <div className="flex gap-1">
              {TransactionType.map((item, index) => (
                <Button key={index} className="capitalize" variant={item.value === selectedType ? "default" : "ghost"} onClick={() => {
                  if (itemIndexSelected !== null) {
                    updateItemResult({ type: item }, itemIndexSelected)
                  }
                  setSelectedType(item.value)
                }}>{item.label}</Button>
              ))}
            </div>
            <DatePickerDemo date={date} setDate={updateDate} />
          </div>
          <div className="flex gap-1 flex-wrap">
            {category.map((item, index) => (
              <Button key={item.id} className="" variant={item.id === selectedCategory ? "default" : "ghost"} onClick={() => {
                if (itemIndexSelected !== null) {
                  updateItemResult({ category: item.id }, itemIndexSelected)
                }
                setSelectedCategory(item.id)
              }}>{item.name}</Button>
            ))}
          </div>
          {itemIndexSelected !== null ? (
            <TransactionsPoi />
          ) : (
            <div className="grid grid-cols-4 gap-2 h-full overflow-y-scroll pr-2">
              <Card className="w-full aspect-square flex justify-center items-center bg-white hover:bg-stone-50 duration-150 cursor-pointer p-4" onClick={() => addItemResult({ ...placeholder, category: selectedCategory, type: selectedType, balance: selectedBalance, transactionDate: date })}><Plus /></Card>
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

const placeholder = {
  item: "Placeholder",
  amount: 0,
  description: "",
};

export default PoiForm;
