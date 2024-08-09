"use client"
import React, { useEffect, useState } from "react";
import { z } from "zod"
import { format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getCategories } from "@/tools/category";
import { getTransactionById, updateTransactions } from "@/tools/transaction";
import { useToast } from "@/components/ui/use-toast"
import { useParams } from "next/navigation";
import { getAllBalances } from "@/tools/balance";

const formSchema = z.object({
  type: z.string().optional(),
  category: z.coerce.number(),
  balance: z.coerce.number(),
  amount: z.coerce.number().optional(),
  item: z.string().optional(),
  description: z.string().optional(),
  transactionDate: z.date().optional(),
})

const TransactionsUpdate: React.FC = () => {
  const { id }: any = useParams()
  const [categories, setCategories] = useState<any>([]);
  const [balances, setBalances] = useState<any>([]);
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories({})
        const balance = await getAllBalances()
        setCategories(data.data);
        setBalances(balance.data);
      } catch (error) {
        console.log(error);
      }
    }

    const fetchTransaction = async () => {
      try {
        const data = await getTransactionById(id)
        const transaction = {
          ...data.data,
          balance: data.data.balance + '',
          category: data.data.category + '',
          transactionDate: new Date(data.data.transactionDate),
        }
        form.reset(transaction)
      } catch (error) {
        console.log(error);
      }
    }

    fetchData().then(() => {
      fetchTransaction();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      category: undefined,
      balance: undefined,
      amount: 0,
      item: "",
      description: "",
      transactionDate: new Date(),
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await updateTransactions(id, values)
    if (!result) {
      return toast({
        title: "Error",
        description: "Something went wrong"
      })
    }
    toast({
      title: "Success",
      description: "Transaction updated"
    })
  }

  return (
    <>
      <Card className="max-w-[350px] xl:max-w-screen-md w-full">
        <CardHeader>
          <CardTitle>Update transaction</CardTitle>
          <CardDescription>How is your day?</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            {field.value ? <SelectValue placeholder="Choose the type" /> : "Choose the type"}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="expense">Expenses</SelectItem>
                          <SelectItem value="income">Income</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value + ''} value={field.value + ''}>
                      <FormControl>
                        <SelectTrigger>
                          {field.value ? <SelectValue placeholder="Select the category" /> : "Select the category"}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup className="overflow-y-auto max-h-[10rem]">
                          {categories.map((category: any) => (
                            <SelectItem key={category.id} value={category.id + ''}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="balance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Balance</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value + ''} value={field.value + ''}>
                      <FormControl>
                        <SelectTrigger>
                          {field.value ? <SelectValue placeholder="Select the balance" /> : "Select the balance"}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup className="overflow-y-auto max-h-[10rem]">
                          {balances.map((balance: any) => (
                            <SelectItem key={balance.id} value={balance.id + ''}>
                              {balance.sourceName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                rules={{ required: "Amount is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter the amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="item"
                rules={{ required: "Item is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item</FormLabel>
                    <FormControl>
                      <Input placeholder="What the thing" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="transactionDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-end">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-1 xl:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add a short note"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-1 xl:col-span-2 w-full flex justify-center">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default TransactionsUpdate;
