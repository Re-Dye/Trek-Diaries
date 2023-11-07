"use client";
import { MapPin } from "lucide-react";
import { useEffect } from "react";
import Flocation from "./Flocation";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useLocationStore } from "@/lib/zustand/location";

export default function Fbar() {
  const session = useSession();
  const locations = useLocationStore((state) => state.locations);
  const setLocations = useLocationStore((state) => state.setLocations);
  const { data, error, status,  } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      // if (session.status === "authenticated") {
      const userId = session.data?.user?.id;

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
    enabled: session.status === "authenticated"
  });

  useEffect(() => {
    if (status === "success") {
      if (data === undefined) {
        console.log("Null data received");
        alert("Error occured while following location. Please try again later.");
        return;
      }
      if (data.status === 200) {
        setLocations(JSON.parse(data.message));
        return;
      } else if (data.status === 400) {
        console.log(data.message);
        alert("Invalid Request. Please try again later with proper information.");
      } else {
        console.log(data.message);
        alert("Error occured while following location. Please try again later.");
      }
    }

    if (status === "error") {
      console.log(error);
      alert("Error occured while following location. Please try again later.");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, data])

  return (
    <div className="flex-row absolute text-xl box-border space-y-6 mt-8 left-5 rounded-2xl border p-8 shadow-md">
      <div className="flex gap-2">
        <h2 className="text-2xl">Followed Locations</h2>
        <MapPin className="w-7 h-7 text-red-600" />
      </div>
      <div className="flex-row cursor-pointer space-y-2">
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
