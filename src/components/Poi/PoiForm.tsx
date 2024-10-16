"use client"
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { usePoiContext } from ".";
import { Button } from "../ui/button";

const PoiForm: React.FC = () => {
  const { toast } = useToast()
  const { setPoiResult } = usePoiContext();
  const [type, setType] = useState("")
  const [selected, setSelected] = useState("")

  return (
    <>
      <Card className="xl:max-w-screen-md w-full h-full mx-auto rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
        <CardContent className="flex flex-col gap-4 pt-6">
          <div className="flex gap-2">
            {["Expense", "Income", "Debt"].map((item, index) => (
              <Button key={item} className="" variant={item === type ? "default" : "ghost"} onClick={() => setType(item)}>{item}</Button>
            ))}
          </div>
          <div className="flex gap-2 overflow-hidden">
            {["All", "Coffee", "Non Coffee", "Food", "Snack", "Other"].map((item, index) => (
              <Button key={item} className="" variant={item === selected ? "default" : "ghost"} onClick={() => setSelected(item)}>{item}</Button>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2 h-full">
            {["All", "Coffee", "Non Coffee", "Food", "Snack", "Other"].map((item, index) => (
              <Card key={item} className="w-full aspect-square flex justify-center items-center">{item}</Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PoiForm;
