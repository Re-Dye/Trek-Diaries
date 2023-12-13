"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { Focus } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { preferData, preferSchema } from "@/lib/zodSchema/preference"

const FormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
})


export default function Preferences() {
    const form = useForm<preferData>({
        resolver: zodResolver(preferSchema),
      })
    
    function onSubmit(data: z.infer<typeof FormSchema>) {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    };
    
      return (
        <div className=" space-y-4">
            <div className="flex justify-center gap-3">
                <h1 className=" text-xl tracking-wider font-semibold">My Preferences</h1><Focus className="text-teal-300"/>
            </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-5 bg-slate-300 dark:bg-black p-6 rounded-2xl">
                  <FormLabel className="flex justify-start">Trekking Expertise</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Beginner
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="mentions" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Average
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="none" />
                        </FormControl>
                        <FormLabel className="font-normal">Expertise</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-5 bg-slate-300 dark:bg-black p-6 rounded-2xl">
                  <FormLabel className="flex justify-start">Interested Trails </FormLabel>
                  <FormControl>
                  <Textarea
                    placeholder="write what trails you are interested in"
                    className="resize-none"
                />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-5 bg-slate-300 dark:bg-black p-6 rounded-2xl">
                  <FormLabel className="flex justify-start">Interested Locations</FormLabel>
                  <FormControl>
                  <Textarea
                    placeholder="write what locations you are interested in"
                    className="resize-none"
                />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-5 bg-slate-300 dark:bg-black p-6 rounded-2xl">
                  <FormLabel className="flex justify-start">Preferred Trekking Distance</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          3 days
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="mentions" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          4 days
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="none" />
                        </FormControl>
                        <FormLabel className="font-normal">5 days</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-5 bg-slate-300 dark:bg-black p-6 rounded-2xl">
                  <FormLabel className="flex justify-start">Preferred Trekking Altitude</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          3000m
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="mentions" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          4000m
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="none" />
                        </FormControl>
                        <FormLabel className="font-normal">5000m</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-5 bg-slate-300 dark:bg-black p-6 rounded-2xl">
                  <FormLabel className="flex justify-start">Preferred trekking month</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="select prefered month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Months</SelectLabel>
                          <SelectItem value="jan">January</SelectItem>
                          <SelectItem value="feb">Februrary</SelectItem>
                          <SelectItem value="mar">March</SelectItem>
                          <SelectItem value="apr">April</SelectItem>
                          <SelectItem value="may">May</SelectItem>
                          <SelectItem value="jun">June</SelectItem>
                          <SelectItem value="jly">July</SelectItem>
                          <SelectItem value="aug">August</SelectItem>
                          <SelectItem value="sep">September</SelectItem>
                          <SelectItem value="oct">October</SelectItem>
                          <SelectItem value="nov">November</SelectItem>
                          <SelectItem value="dec">December</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-5 bg-slate-300 dark:bg-black p-6 rounded-2xl">
                  <FormLabel className="flex justify-start">Any Other Interests</FormLabel>
                  <FormControl>
                  <Textarea
                    placeholder="write what locations you are interested in"
                    className="resize-none"
                />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        </div>
      )
}