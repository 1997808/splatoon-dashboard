"use client"
import React from "react";
import { z } from "zod"
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { formatMoney, revertFormattedMoney } from "@/lib/utils";
import { useLoansContext } from ".";
import { Slider } from "@/components/ui/slider";
import { calculateDecliningPayments, calculateInterestOnlyLoan, calculateStablePayment } from "@/lib/loanUtils";

const loanCalculatorSchema = z.object({
  calculationType: z.string(),
  loanAmount: z.string(),  // Total loanAmount before deductions
  term: z.coerce.number().min(0).max(99),  // Number of dependents
  interest: z.coerce.number().min(0).max(99),  // Total insurance contributions (if applicable)
})

const VNLoanForm: React.FC = () => {
  const { toast } = useToast()
  const { setLoansResult } = useLoansContext();

  // 1. Define your form.
  const form = useForm<z.infer<typeof loanCalculatorSchema>>({
    resolver: zodResolver(loanCalculatorSchema),
    defaultValues: {
      calculationType: "payment decreasing",
      loanAmount: "2000000000",
      term: 5,
      interest: 7,
    },
  })

  const onSubmit = async (values: z.infer<typeof loanCalculatorSchema>) => {
    const { calculationType, loanAmount, term, interest } = values
    let result
    if (calculationType === "payment decreasing") {
      result = calculateDecliningPayments(Number(loanAmount), interest, term)
    } else if (calculationType === "payment stable") {
      result = calculateStablePayment(Number(loanAmount), interest, term)
    } else {
      result = calculateInterestOnlyLoan(Number(loanAmount), interest, term)
    }
    setLoansResult(result)
    // toast({
    //   title: "Success",
    //   description: "Profile updated"
    // })
  }

  return (
    <>
      <Card className="xl:max-w-screen-md w-full mx-auto rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
        <CardHeader>
          <CardTitle>Loan repayment calculator</CardTitle>
          <CardDescription>How is your day?</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="calculationType"
                render={({ field }) => (
                  <FormItem className="col-span-1 xl:col-span-2">
                    <FormLabel>Calculation Type</FormLabel>
                    <FormControl>
                      <Tabs defaultValue="payment decreasing" className="max-w-[400px]" onClick={(e: any) => form.setValue("calculationType", e.target.innerText.toLowerCase())}>
                        <TabsList>
                          <TabsTrigger value="payment decreasing">Payment decreasing</TabsTrigger>
                          <TabsTrigger value="payment stable">Payment stable</TabsTrigger>
                          <TabsTrigger value="interest only">Interest only</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="loanAmount"
                rules={{ required: "Loan amount is required" }}
                render={({ field }) => (
                  <FormItem className="col-span-1 xl:col-span-2">
                    <FormLabel>Loan Amount</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} onChange={(e) => form.setValue("loanAmount", revertFormattedMoney(e.target.value))} value={formatMoney(field.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="term"
                render={({ field }) => (
                  <FormItem className="col-span-1 xl:col-span-2">
                    <FormLabel>Term (years)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <Slider className="!mt-4" defaultValue={[5]} min={1} max={40} step={1} onChange={(e: any) => form.setValue("term", e.target.value)} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interest"
                render={({ field }) => (
                  <FormItem className="col-span-1 xl:col-span-2">
                    <FormLabel>Interest Rate (%)</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <Slider className="!mt-4" defaultValue={[5]} min={0} max={40} step={0.1} onChange={(e: any) => form.setValue("interest", e.target.value)} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-1 xl:col-span-2 w-full flex justify-center">
                <Button type="submit">Update</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default VNLoanForm;
