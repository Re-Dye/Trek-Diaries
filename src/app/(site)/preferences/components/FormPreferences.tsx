"use client";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

import { preferData, preferSchema } from "@/lib/zodSchema/preference";
import { useState } from "react";
import { InsertPreference, ReturnPreference } from "@/lib/zodSchema/dbTypes";
import { useMutation } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "@/components/ui/use-toast";

const trails = [
  { label: "Aanbu Kahireni Trail", value: "Aanbu Kahireni Trail" },
  { label: "Annapurna Base Camp Heli Trek", value: "abcht" },
  { label: "Annapurna Base Camp Short Trek", value: "abcst" },
  { label: "Annapurna Base Camp Trek", value: "Annapurna Base Camp Trek" },
] as const;

const features = [
  { id: "village", label: "village" },
  { id: "forest", label: "forest" },
  { id: "mountain", label: "mountain" },
  { id: "snow", label: "snow" },
  { id: "viewpoint", label: "viewpoint" },
  { id: "lake", label: "lake" },
] as const;

export default function FormPreferences({
  userId,
  preference,
}: {
  userId: string;
  preference: ReturnPreference | null;
}) {
  const [open, setOpen] = useState(false);
  const form = useForm<preferData>({
    resolver: zodResolver(preferSchema),
    defaultValues: {
      trail: preference ? preference.trail : "",
      type: preference ? preference.type : "easy",
      features: preference? JSON.parse(preference.features): ["village"],
      month: preference ? preference.month : "jan",
      distance: preference ? preference.distance.toString() : "",
      altitude: preference ? preference.altitude.toString() : "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data: preferData) => {
      const req: InsertPreference = {
        altitude: +data.altitude,
        distance: +data.distance,
        features: JSON.stringify(data.features),
        month: data.month,
        trail: data.trail,
        type: data.type,
        user_id: userId,
      };
      const res = await fetch(`/api/preference/add`, {
        method: preference ? "PATCH" : "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });

      const message = await res.json();
      const status = res.status;

      return { message, status };
    },
    onSuccess: (data) => {
      if (data.status === 201) {
        toast({
          title: "Success",
          description: preference? "Preference updated successfully" : "Preference added successfully",
        });
      } else if (data.status === 400) {
        toast({
          title: "Error",
          description: "Invalid data. Please try again with valid data",
        });
      } else {
        toast({
          title: "Error",
          description: preference? "Error updating preference" : "Error adding preference",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `${error.message}\nPlease try again later`,
      });
    },
  });

  const onSubmit = async (data: preferData) => mutate(data);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-5 bg-slate-300 dark:bg-black p-6 rounded-2xl">
              <FormLabel className="flex justify-start">
                Trekking Difficulty
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={preference ? preference.type : field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="easy" />
                    </FormControl>
                    <FormLabel className="font-normal">Easy</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="moderate" />
                    </FormControl>
                    <FormLabel className="font-normal">Moderate</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="challenging" />
                    </FormControl>
                    <FormLabel className="font-normal">Challenging</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="trail"
          render={({ field }) => (
            <FormItem className="space-y-5 bg-slate-300 dark:bg-black p-6 rounded-2xl">
              <FormLabel className="flex justify-start">
                Interested Trails{" "}
              </FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      aria-expanded={open}
                      role="combobox"
                      className={cn(
                        "w-[300px] justify-between flex",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? trails.find((trail) => trail.value === field.value)
                            ?.label
                        : "Select Interested Trail"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {trails.map((trail) => (
                        <CommandItem
                          className=" cursor-pointer"
                          value={trail.label}
                          key={trail.value}
                          onSelect={() => {
                            form.setValue("trail", trail.value);
                            setOpen(false);
                          }}
                        >
                          {trail.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              trail.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="distance"
          render={({ field }) => (
            <FormItem className="space-y-5 bg-slate-300 dark:bg-black p-6 rounded-2xl">
              <FormLabel className="flex justify-start">
                Preferred Trekking Distance
              </FormLabel>
              <FormControl>
                <Textarea
                  defaultValue={preference ? preference.distance.toString() : field.value}
                  placeholder="write your prefered distance(in KM)"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="altitude"
          render={({ field }) => (
            <FormItem className="space-y-5 bg-slate-300 dark:bg-black p-6 rounded-2xl">
              <FormLabel className="flex justify-start">
                Preferred Trekking Altitude
              </FormLabel>
              <FormControl>
                <Textarea
                  defaultValue={preference ? preference.altitude.toString() : field.value}
                  placeholder="write your prefered altitude(in m)"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="month"
          render={({ field }) => (
            <FormItem className="space-y-5 bg-slate-300 dark:bg-black p-6 rounded-2xl">
              <FormLabel className="flex justify-start">
                Preferred trekking month
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={preference ? preference.month : field.value}
                >
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
                      <SelectItem value="jul">July</SelectItem>
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
              <FormLabel className="flex justify-start">
                Any Other Interests
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="checkbox"
                      className={cn(
                        "w-[500px] justify-between flex",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? features.find(
                            (features) => features.id === features.id
                          )?.label
                        : "Select Interested Features like snow, forest, lake etc."}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[500px] flex h-[100px] flex-wrap p-4 gap-5">
                  {features.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="features"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                defaultValue={preference? JSON.parse(preference.features).includes(item.id):field.value?.includes(item.id)}
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
