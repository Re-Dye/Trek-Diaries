"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button, ButtonLoading } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  AddLocationFormSchema,
  AddLocationFormData,
} from "@/lib/zodSchema/addLocation";
import { Textarea } from "@/components/ui/textarea";
import { Info } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { ReturnLocation, selectLocationSchema } from "@/lib/zodSchema/dbTypes";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function AddLocation() {
  
  const {toast} = useToast()
  const form = useForm<AddLocationFormData>({
    resolver: zodResolver(AddLocationFormSchema),
  });

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: AddLocationFormData) => {
      const res = await fetch("/api/location/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const message: string = await res.json();
      const status = res.status;
      return { message, status };
    },
    onError: (error) => {
      console.log(error);
      alert(error);
    },
    onSuccess: (data) => {
      if (data.status === 201) {
        const location: ReturnLocation = selectLocationSchema.parse(JSON.parse(data.message));
        toast({
          className: "fixed rounded-md top-0 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          title: "Location Added",
          description: "Location added successfully. Might take some time to appear in search."
        })
        router.push(`/location/${location.id}`);
        return;
      }

      if (data.status === 409) {
        toast({
          className: "fixed rounded-md top-0 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          description: "Location already exists."
        })
        return;
      }

      if (data.status === 400) {
        toast({
          className: "fixed rounded-md top-2 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          title: "Invalid Request",
          description: "Please try again later with proper information."
        })
        return;
      }
      toast({
        variant: "destructive",
        className: "fixed rounded-md top-2 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
        description: "Error occured while adding location. Please try again later.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    },
  });

  const handleAddLocation: SubmitHandler<AddLocationFormData> = (data) => mutate(data);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default" className="w-1/4 h-10">
          Add Location
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 rounded-2xl">
        <div className="flex-row space-y-4">
          <div className="flex justify-center items-center gap-3">
            <h2 className="text-2xl ">Location Information</h2>
            <Info className="w-7 h-7 text-cyan-600" />
          </div>
          <Form {...form}>
            <form
              className=" w-full space-y-2 justify-center items-center"
              onSubmit={form.handleSubmit(handleAddLocation)}
            >
              <FormField
                control={form.control}
                name="place"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="justify-start flex">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="address"
                        className="h-8 w-full"
                        placeholder="Address"
                        {...field}
                        type="text"
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="justify-start flex">
                      District/State name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="state"
                        className="h-8 w-full"
                        placeholder="District/State name"
                        {...field}
                        type="text"
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="justify-start flex">
                      Country name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="country"
                        className="h-8 w-full"
                        placeholder="Country name"
                        {...field}
                        type="text"
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="justify-start flex">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="message"
                        className="h-8 w-full"
                        placeholder="type full description"
                        {...field}
                      ></Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                {isPending ? (
                  <ButtonLoading className=" btn mt-3 px-3 py-2 transition ease-in-out delay-100 text-xs text-white rounded-md w-full bg-cyan-600 lg:h-8 xl:h-10 " />
                ) : (
                  <Button className="w-full mt-4" type="submit">
                    Add
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
