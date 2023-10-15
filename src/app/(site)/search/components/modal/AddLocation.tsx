"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button} from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { addLocationFormSchema } from "@/lib/zodSchema/addLocation";
import { Textarea } from "@/components/ui/textarea";
import { Info } from "lucide-react";

export default function AddLocation() {

  const form = useForm<z.infer<typeof addLocationFormSchema>>({
    resolver: zodResolver(addLocationFormSchema),
  });
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const disable = useDisable(address, state, country, description);
  const router = useRouter();

  const handleAddLocation = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/add_location", {
        address: `${address}, ${state}, ${country}`,
        description,
      });

      console.log(data);

      if (data) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <Popover>
        <PopoverTrigger asChild>
        <Button variant="default" className="w-1/4 h-10">Add Location</Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 rounded-2xl">
        <div className="flex-row space-y-4">
            <div className="flex justify-center items-center gap-3">
              <h2 className="text-2xl ">Location Information</h2>
              <Info className="w-7 h-7 text-cyan-600"/>
            </div>
            <Form {...form}>
            <form
              className=" w-full space-y-2 justify-center items-center"
              onSubmit={form.handleSubmit(handleAddLocation)}>
            <FormField
                control={form.control}
                name="address"
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
                name="desc"
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
              <Button
              className="w-full mt-4"
              type="submit">Add
            </Button>
            </div>
            </form>
            </Form>
        </div>
      </PopoverContent>
      </Popover>
  );
}

function useDisable(
  address: string,
  state: string,
  country: string,
  description: string
) {
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    /* if all inputs empty */
    if (
      address.length === 0 ||
      state.length === 0 ||
      country.length === 0 ||
      description.length === 0
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [address, state, country, description]);

  return disable;
}
