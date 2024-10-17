"use client"
import PoiForm from "@/components/Poi/PoiForm";
import PoiResult from "@/components/Poi/PoiResult";
import { getCategories } from "@/tools/category";
import { getAllTransactions } from "@/tools/transaction";
import React, { createContext, useContext, useEffect, useState } from "react";

interface Item {
  type?: string,
  category?: number,
  balance?: number,
  amount?: number,
  item?: string,
  description?: string,
  transactionDate?: Date,
}

export type ContextProps = {
  category: any[]
  itemList: any[]
  setItemList: React.Dispatch<React.SetStateAction<any>>
  itemResult: any[]
  addItemResult: (item: any) => void
  deleteItemResult: (item: any) => void
  itemSelected: {}
  setItemSelect: React.Dispatch<React.SetStateAction<any>>
};

const PoiContext = createContext<ContextProps>({ category: [], itemList: [], setItemList: () => { }, itemResult: [], addItemResult: () => { }, deleteItemResult: () => { }, itemSelected: [], setItemSelect: () => { } })

const Poi: React.FC = () => {
  const [itemList, setItemList] = useState<any[]>([])
  const [category, setCategory] = useState<any[]>([])
  const [itemResult, setItemResult] = useState<Item[]>([])
  const [itemSelected, setItemSelect] = useState<Item>({})

  const addItemResult = (item: any) => {
    console.log(item, '========= add')
    setItemResult([...itemResult, item])
  }

  const deleteItemResult = (index: any) => {
    console.log(index, '========= delete')
    setItemResult([...itemResult.slice(0, index), ...itemResult.slice(index + 1)])
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllTransactions({ take: 50, order: 'DESC' })
        const list = await getCategories({})
        setItemList(data.data.data);
        setCategory(list.data)
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  return (
    <PoiContext.Provider value={{ category, itemList, setItemList, itemResult, addItemResult, deleteItemResult, itemSelected, setItemSelect }}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-screen">
        <div className="col-span-2 h-full">
          <PoiForm />
        </div>
        <PoiResult />
      </div>
    </PoiContext.Provider>
  );
};


export const usePoiContext = () => {
  const context = useContext(PoiContext);
  if (!context) {
    throw new Error("useContext must be used within a Provider");
  }
  return context;
};

export default Poi;