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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { formatMoney, revertFormattedMoney } from "@/lib/utils";
import { calculateTax } from "@/lib/taxUtils";
import { useTaxesContext } from ".";

const taxCalculatorSchema = z.object({
  incomeType: z.string(),
  income: z.string(),  // Total income before deductions
  personalDeduction: z.string(),  // Personal deduction (default or customizable)
  dependentDeduction: z.string(),  // Deduction per dependent (if applicable)
  numDependents: z.coerce.number().min(0),  // Number of dependents
  insuranceContributions: z.string(),  // Total insurance contributions (if applicable)
  otherDeductions: z.string().optional(),  // Any other deductions (e.g., charitable donations, work-related expenses)
  taxYear: z.string().optional(),  // Tax year (optional for reference)
  maritalStatus: z.enum(["single", "married"]).optional(),  // Marital status (affects tax calculation in some countries)
  residencyStatus: z.enum(["resident", "non-resident"]).optional(),  // Residency status (affects tax rules in some countries)
})

const VNTaxForm: React.FC = () => {
  const { toast } = useToast()
  const { setTaxesResult } = useTaxesContext();

  // 1. Define your form.
  const form = useForm<z.infer<typeof taxCalculatorSchema>>({
    resolver: zodResolver(taxCalculatorSchema),
    defaultValues: {
      incomeType: "gross",
      income: "10000000",
      personalDeduction: "11000000",
      dependentDeduction: "4400000",
      numDependents: 0,
      insuranceContributions: "5000000",
      otherDeductions: "0",
      taxYear: "2024",
      maritalStatus: "single",
      residencyStatus: "resident",
    },
  })

  const onSubmit = async (values: z.infer<typeof taxCalculatorSchema>) => {
    const result = calculateTax(values)
    setTaxesResult(result)
    // toast({
    //   title: "Success",
    //   description: "Profile updated"
    // })
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
                name="incomeType"
                rules={{ required: "Income is required" }}
                render={({ field }) => (
                  <FormItem className="col-span-1 xl:col-span-2">
                    <FormLabel>Income Type</FormLabel>
                    <FormControl>
                      <Tabs defaultValue="gross" className="max-w-[400px]" onClick={(e: any) => form.setValue("incomeType", e.target.innerText.toLowerCase())}>
                        <TabsList>
                          <TabsTrigger value="gross" >Gross</TabsTrigger>
                          <TabsTrigger value="net">Net</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="income"
                rules={{ required: "Income is required" }}
                render={({ field }) => (
                  <FormItem className="col-span-1 xl:col-span-2">
                    <FormLabel>Income</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} onChange={(e) => form.setValue("income", revertFormattedMoney(e.target.value))} value={formatMoney(field.value)} />
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
                render={({ field }) => (
                  <FormItem className="col-span-1 xl:col-span-2">
                    <FormLabel>Insurance Contributions</FormLabel>
                    <RadioGroup defaultValue="">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Full" id="r1" onClick={(e) => form.setValue("insuranceContributions", (e.currentTarget as HTMLInputElement).value)} />
                        <Label htmlFor="r1">Full salary</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="" id="r2" onClick={(e) => form.setValue("insuranceContributions", (e.currentTarget as HTMLInputElement).value)} />
                        <Label htmlFor="r2">Other</Label>
                      </div>
                    </RadioGroup>
                    <FormControl>
                      <Input type="text" disabled={field.value === "Full"} {...field} onChange={(e) => form.setValue("insuranceContributions", revertFormattedMoney(e.target.value))} value={formatMoney(field.value)} />
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
