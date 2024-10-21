"use client"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { currencies } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { getAllBalances } from "@/tools/balance";
import { getBillById, updateBills } from "@/tools/bill";
import { getCategories } from "@/tools/category";
import { TransactionType } from "@/types/transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  logo: z.string().optional(),
  item: z.string(),
  type: z.string().optional(),
  status: z.string(),
  category: z.coerce.number(),
  balance: z.coerce.number(),
  amount: z.coerce.number(),
  description: z.string().optional(),
  currency: z.string(),
  frequencyValue: z.coerce.number().positive().lte(30),
  frequencyUnit: z.string(),
  dueDate: z.date().optional(),
})

const BillsUpdate: React.FC = () => {
  const { id }: any = useParams()
  const [categories, setCategories] = useState<any>([]);
  const [balances, setBalances] = useState<any>([]);
  const { toast } = useToast()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logo: "",
      item: "",
      type: "",
      status: "",
      category: 0,
      balance: 0,
      amount: 0,
      description: "",
      currency: "",
      frequencyValue: 0,
      frequencyUnit: "",
      dueDate: new Date(),
    },
  })

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

    const fetchBill = async () => {
      try {
        const data = await getBillById(id)
        const bill = {
          ...data.data,
          balance: data.data.balance + '',
          category: data.data.category + '',
          dueDate: new Date(data.data.dueDate),
        }
        form.reset(bill)
      } catch (error) {
        console.log(error);
      }
    }

    fetchData().then(() => {
      fetchBill();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await updateBills(id, values)
    if (!result) {
      return toast({
        title: "Error",
        description: "Something went wrong"
      })
    }
    toast({
      title: "Success",
      description: "Updated bill"
    })
  }

  return (
    <>
      <Card className="max-w-[350px] xl:max-w-screen-md w-full">
        <CardHeader>
          <CardTitle>Update bill</CardTitle>
          <CardDescription>How is your day?</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem className="col-span-1 xl:col-span-2">
                    <FormLabel>Logo</FormLabel>
                    <FormControl>
                      <Input placeholder="Send link" {...field} />
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
                          {TransactionType.map((item, index) => (
                            <SelectItem key={index} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
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
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          {field.value ? <SelectValue placeholder="Select the currency" /> : "Select the currency"}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup className="overflow-y-auto max-h-[10rem]">
                          {currencies.map((currency: any) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              {currency.code}
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
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-end">
                    <FormLabel>Due date</FormLabel>
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            {field.value ? <SelectValue placeholder="Select status" /> : "Select status"}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="deactive">Deactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="frequencyValue"
                rules={{ required: "Amount is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter the frequency" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="frequencyUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency Unit</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            {field.value ? <SelectValue placeholder="Choose the frequency" /> : "Choose the frequency"}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="day">Day</SelectItem>
                          <SelectItem value="week">Week</SelectItem>
                          <SelectItem value="month">Month</SelectItem>
                          <SelectItem value="year">Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
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

export default BillsUpdate;
