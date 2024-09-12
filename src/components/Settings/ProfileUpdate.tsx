"use client"
import React, { useEffect } from "react";
import { useParams } from 'next/navigation'
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { currencies } from "@/lib/currency";
import { updateProfile } from "@/tools/user";
import { getUserProfile, updateUserProfile } from "@/lib/utils";

const formSchema = z.object({
  username: z.string().optional(),
  email: z.string(),
  currency: z.string(),
  theme: z.string().optional(),
})

const ProfileUpdate: React.FC = () => {
  const { toast } = useToast()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      currency: "",
      theme: "",
    },
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile()
        form.reset(data)
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await updateProfile(values)
    if (!result) {
      return toast({
        title: "Error",
        description: "Something went wrong"
      })
    }
    await updateUserProfile()
    toast({
      title: "Success",
      description: "Profile updated"
    })
  }

  return (
    <>
      <Card className="xl:max-w-screen-md w-full rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
        <CardHeader>
          <CardTitle>Update profile</CardTitle>
          <CardDescription>How is your day?</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="username"
                rules={{ required: "Username is required" }}
                render={({ field }) => (
                  <FormItem className="col-span-1 xl:col-span-2">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="It can be your real name or a pseudonym" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <FormItem className="col-span-1 xl:col-span-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="What the thing" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="col-span-1 xl:col-span-2">
                    <FormLabel>Default currency</FormLabel>
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
                    <FormDescription className="text-xs">
                      Default currency to use when create transactions.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem className="col-span-1 xl:col-span-2">
                    <FormLabel>Theme</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            {field.value ? <SelectValue placeholder="Select theme" /> : "Select theme"}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription className="text-xs">
                      Select the theme for the website.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-1 xl:col-span-2 w-full flex justify-center">
                <Button type="submit">Update profile</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileUpdate;
