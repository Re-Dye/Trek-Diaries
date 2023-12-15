"use client";
import { MapPin } from "lucide-react";
import { useEffect } from "react";
import Flocation from "./Flocation";
import { useQuery } from "@tanstack/react-query";
import { useLocationStore } from "@/lib/zustand/location";
import { useToast } from "@/components/ui/use-toast";

export default function Fbar({ user }: { user: any}) {
  const {toast} = useToast();
  const locations = useLocationStore((state) => state.locations);
  const setLocations = useLocationStore((state) => state.setLocations);
  const { data, error, status,  } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      // if (session.status === "authenticated") {
      const userId = user?.id;

      const res = await fetch(`/api/location/get?userId=${userId}`, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      const message: string = await res.json();
      const status = res.status;
      return { message, status };
      // }
    },
    enabled: (user?.id !== undefined)
  });

  useEffect(() => {
    if (status === "success") {
      if (data === undefined) {
        console.log("Null data received");
        toast({
          variant: "destructive",
          className: "fixed rounded-md top-2 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          description: "Error occured while following location. Please try again later.",
        })
        return;
      }
      if (data.status === 200) {
        setLocations(JSON.parse(data.message));
        return;
      } else if (data.status === 400) {
        console.log(data.message);
        toast({
          className: "fixed rounded-md top-0 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          title: "Invalid Request",
          description: "Please try again later with proper information."
        })
      } else {
        console.log(data.message);
        toast({
          variant: "destructive",
          className: "fixed rounded-md top-2 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          description: "Error occured while following location. Please try again later.",
        })
      }
    }

    if (status === "error") {
      console.log(error);
      toast({
        variant: "destructive",
        className: "fixed rounded-md top-2 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
        description: "Error occured while following location. Please try again later.",
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, data])

  return (
    <div className="flex-row absolute box-border space-y-3 mt-4 left-[5px] lg:space-y-6 lg:mt-8 lg:left-5 rounded-md lg:rounded-2xl p-2 lg:p-8 shadow-md bg-slate-100 dark:bg-neutral-800">
      <div className="flex gap-1 lg:gap-2">
        <h2 className="text-[10px] sm:text-sm lg:text-2xl">Followed Locations</h2>
        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 lg:w-7 lg:h-7 text-red-600" />
      </div>
      <div className="flex-row cursor-pointer space-y-2 sm:space-y-3">
        {locations.map((location) => (
          <Flocation
            key={location.locationId}
            id={location.locationId}
            address={location.address}
          />
        ))}
      </div>
    </div>
  );
}
