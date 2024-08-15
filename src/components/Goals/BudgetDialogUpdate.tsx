import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Pencil } from "lucide-react"
import { z } from "zod"
import { updateBudgets } from "@/tools/budget"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"
import { useGoalContext } from "."
import { useEffect, useState } from "react"

const formSchema = z.object({
  budgetAmount: z.coerce.number(),
})

const BudgetDialogUpdate = () => {
  const [open, setOpen] = useState(false)
  const { budgetId, budgetAmount } = useGoalContext()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  useEffect(() => {
    form.reset({
      budgetAmount
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budgetAmount])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await updateBudgets(budgetId + '', values)
    if (!result) {
      return toast({
        title: "Error",
        description: "Something went wrong"
      })
    }
    toast({
      title: "Success",
      description: "Budget updated"
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Adjust Budget <Pencil size={14} className="ml-2" /></Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px]" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edit budget this month</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="budgetAmount"
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
            <div className="col-span-1 w-full flex justify-center">
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default BudgetDialogUpdate
