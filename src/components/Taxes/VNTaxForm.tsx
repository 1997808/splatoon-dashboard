"use client"
import React, { useEffect } from "react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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
import { useToast } from "@/components/ui/use-toast"
import { formatMoney, revertFormattedMoney } from "@/lib/utils";

const taxCalculatorSchema = z.object({
  grossIncome: z.string(),  // Total income before deductions
  personalDeduction: z.string().optional(),  // Personal deduction (default or customizable)
  dependentDeduction: z.string().optional(),  // Deduction per dependent (if applicable)
  numDependents: z.number().min(0).optional(),  // Number of dependents
  insuranceContributions: z.string().optional(),  // Total insurance contributions (if applicable)
  otherDeductions: z.string().optional(),  // Any other deductions (e.g., charitable donations, work-related expenses)
  taxYear: z.string().optional(),  // Tax year (optional for reference)
  incomeType: z.enum(["employment", "business", "investment"]).optional(),  // Type of income (some countries tax different income types differently)
  maritalStatus: z.enum(["single", "married"]).optional(),  // Marital status (affects tax calculation in some countries)
  residencyStatus: z.enum(["resident", "non-resident"]).optional(),  // Residency status (affects tax rules in some countries)
})

const VNTaxForm: React.FC = () => {
  const { toast } = useToast()

  // 1. Define your form.
  const form = useForm<z.infer<typeof taxCalculatorSchema>>({
    resolver: zodResolver(taxCalculatorSchema),
    defaultValues: {
      grossIncome: "0",
      personalDeduction: "11000000",
      dependentDeduction: "4400000",
      numDependents: 0,
      insuranceContributions: "5000000",
      otherDeductions: "0",
      taxYear: "2024",
      incomeType: "employment",
      maritalStatus: "single",
      residencyStatus: "resident",
    },
  })

  const onSubmit = async (values: z.infer<typeof taxCalculatorSchema>) => {
    console.log(values, '===============')
    toast({
      title: "Success",
      description: "Profile updated"
    })
  }

  return (
    <>
      <Card className="xl:max-w-screen-md w-full mx-auto rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
        <CardHeader>
          <CardTitle>Salary calculator</CardTitle>
          <CardDescription>How is your day?</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="grossIncome"
                rules={{ required: "Gross income is required" }}
                render={({ field }) => (
                  <FormItem className="col-span-1 xl:col-span-2">
                    <FormLabel>Gross Income</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} onChange={(e) => form.setValue("grossIncome", revertFormattedMoney(e.target.value))} value={formatMoney(field.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personalDeduction"
                render={({ field }) => (
                  <FormItem className="col-span-1 xl:col-span-2 hidden">
                    <FormLabel>Personal Deduction</FormLabel>
                    <FormControl>
                      <Input type="text" disabled {...field} value={formatMoney(field.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dependentDeduction"
                render={({ field }) => (
                  <FormItem className="col-span-1 xl:col-span-2 hidden">
                    <FormLabel>Dependent Deduction</FormLabel>
                    <FormControl>
                      <Input type="text" disabled {...field} value={formatMoney(field.value)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numDependents"
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <FormItem className="col-span-1 xl:col-span-2">
                    <FormLabel>Number of Dependents</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="insuranceContributions"
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <FormItem className="col-span-1 xl:col-span-2">
                    <FormLabel>Insurance Contributions</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} value={formatMoney(field.value)} />
                    </FormControl>
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

export default VNTaxForm;
