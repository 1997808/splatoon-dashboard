"use client"
import Loading from "@/app/loading";
import PoiForm from "@/components/Poi/PoiForm";
import PoiResult from "@/components/Poi/PoiResult";
import { useToast } from "@/components/ui/use-toast";
import { getAllBalances } from "@/tools/balance";
import { getCategories } from "@/tools/category";
import { createManyTransactions, getAllTransactions } from "@/tools/transaction";
import dayjs from "dayjs";
import React, { createContext, useContext, useEffect, useState } from "react";

interface Item {
  id?: number,
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
  balances: any[]
  selectedBalance: number
  setSelectedBalance: React.Dispatch<React.SetStateAction<number>>
  selectedType: string
  setSelectedType: React.Dispatch<React.SetStateAction<string>>
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
  selectedCategory: number
  setSelectedCategory: React.Dispatch<React.SetStateAction<number>>

  itemList: any[]
  setItemList: React.Dispatch<React.SetStateAction<any>>
  itemResult: any[]
  selectItemForEdit: (item: Item, index: any) => void
  addItemResult: (item: Item) => void
  updateItemResult: (item: Item, index: any) => void
  updateFormResult: (item: Item, index: any) => void
  deleteItemResult: (index: any) => void
  itemSelected: any
  setItemSelected: React.Dispatch<React.SetStateAction<any>>
  itemIndexSelected: number | null
  setItemIndexSelected: React.Dispatch<React.SetStateAction<number | null>>

  onSubmit: () => void
};

const PoiContext = createContext<ContextProps>({ category: [], balances: [], selectedBalance: 0, setSelectedBalance: () => { }, selectedType: "expense", setSelectedType: () => { }, date: new Date(), setDate: () => { }, selectedCategory: 0, setSelectedCategory: () => { }, itemList: [], setItemList: () => { }, itemResult: [], selectItemForEdit: () => { }, addItemResult: () => { }, updateItemResult: () => { }, updateFormResult: () => { }, deleteItemResult: () => { }, itemSelected: [], setItemSelected: () => { }, itemIndexSelected: null, setItemIndexSelected: () => { }, onSubmit: () => { } })

const Poi: React.FC = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState<any[]>([])
  const [balances, setBalances] = useState<any[]>([])
  const [selectedType, setSelectedType] = useState("expense")
  const [date, setDate] = useState<Date>(dayjs().toDate())
  const [selectedCategory, setSelectedCategory] = useState<any>()

  const [selectedBalance, setSelectedBalance] = useState(0)
  const [itemList, setItemList] = useState<any[]>([])
  const [itemResult, setItemResult] = useState<Item[]>([])
  const [itemSelected, setItemSelected] = useState<Item>({})
  const [itemIndexSelected, setItemIndexSelected] = useState<number | null>(null)

  const selectItemForEdit = (item: Item, index: number) => {
    setItemIndexSelected(index)
    setItemSelected(item)
    item.type !== undefined && setSelectedType(item.type)
    item.category !== undefined && setSelectedCategory(item.category)
    item.transactionDate !== undefined && setDate(item.transactionDate)
    item.balance !== undefined && setSelectedBalance(item.balance)
  }

  const addItemResult = (item: Item) => {
    const newItem = { ...item, balance: selectedBalance, transactionDate: date }
    setItemResult([...itemResult, newItem])
  }

  const updateItemResult = (item: Item, index: number) => {
    setItemResult([...itemResult.slice(0, index), { ...itemResult[index], ...item }, ...itemResult.slice(index + 1)])
  }

  const updateFormResult = (item: Item, index: number) => {
    setItemResult([...itemResult.slice(0, index), { ...itemResult[index], ...item }, ...itemResult.slice(index + 1)])
    deselectItem()
  }

  const deleteItemResult = (index: number) => {
    setItemResult([...itemResult.slice(0, index), ...itemResult.slice(index + 1)])
    deselectItem()
  }

  const deselectItem = () => {
    setItemIndexSelected(null)
    setItemSelected({})
  }

  const onSubmit = async () => {
    // remove id field from every result
    const itemMapped = itemResult.map((item) => {
      delete item.id
      return item
    })
    const result = await createManyTransactions(itemMapped)
    if (!result) {
      return toast({
        title: "Error",
        description: "Something went wrong"
      })
    }
    toast({
      title: "Success",
      description: "Transaction created"
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await getAllTransactions({ take: 50, order: 'DESC' })
        const list = await getCategories({})
        const balances = await getAllBalances()
        setItemList(data.data.data);
        setCategory(list.data)
        setBalances(balances.data)
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }

    fetchData();
  }, [])

  return (
    <PoiContext.Provider value={{ category, balances, selectedBalance, setSelectedBalance, selectedType, setSelectedType, date, setDate, selectedCategory, setSelectedCategory, itemList, setItemList, itemResult, selectItemForEdit, addItemResult, updateItemResult, updateFormResult, deleteItemResult, itemSelected, setItemSelected, itemIndexSelected, setItemIndexSelected, onSubmit }}>
      {loading ? <Loading /> : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-screen">
          <div className="col-span-2 h-full">
            <PoiForm />
          </div>
          <PoiResult />
        </div>
      )}
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