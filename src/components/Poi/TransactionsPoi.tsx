"use client"
import { usePoiContext } from "@/components/Poi";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  amount: z.coerce.number().optional(),
  item: z.string().optional(),
  description: z.string().optional(),
})

const TransactionsPoi: React.FC = () => {
  const { updateFormResult, itemSelected, itemIndexSelected } = usePoiContext();
  const { toast } = useToast()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      item: "",
      description: "",
    },
  })

  useEffect(() => {
    if (itemIndexSelected !== null) {
      form.reset({
        amount: itemSelected?.amount,
        item: itemSelected?.item,
        description: itemSelected?.description
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemIndexSelected])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // TODO handle apply update item in list
    updateFormResult(values, itemIndexSelected)
  }

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[350px] xl:max-w-screen-md w-full flex flex-col gap-4">
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
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-1">
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
            <div className="col-span-1 w-full flex justify-center">
              <Button type="submit">Update detail</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default TransactionsPoi;
