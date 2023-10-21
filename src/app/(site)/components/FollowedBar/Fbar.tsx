"use client";
import Flocation from "../FollowedLocation/Flocation";
import { Location } from "../../layout";
import { MapPin } from "lucide-react";
import { useMutation } from "react-query";
import {
  UsersToLocations,
  usersToLocationsSchema,
} from "@/lib/zodSchema/dbTypes";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Fbar({ locations }: { locations: Array<Location> }) {
  const session = useSession();
  const { mutate, isLoading } = useMutation({
    mutationKey: "followLocation",
    mutationFn: async () => {
      if (session.status === "authenticated") {
        const userId = session.data.user?.id;

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
      }
    },
    onSuccess: (data) => {
      if (data === undefined) {
        console.log("Null data received");
        alert(
          "Error occured while following location. Please try again later."
        );
        return;
      }
      if (data.status === 200) {
        console.log(data.message);
        return;
      } else if (data.status === 400) {
        console.log(data.message);
        alert(
          "Invalid Request. Please try again later with proper information."
        );
      } else {
        console.log(data.message);
        alert(
          "Error occured while following location. Please try again later."
        );
      }
    },
    onError: (error) => {
      console.log(error);
      alert(error);
    },
  });

  useEffect(() => {
    if (session.status === "authenticated") {
      mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="flex-row absolute text-xl box-border space-y-6 mt-8 left-5 rounded-2xl border p-8 shadow-md">
      <div className="flex gap-2">
        <h2 className="text-2xl">Followed Locations</h2>
        <MapPin className="w-7 h-7 text-red-600" />
      </div>
      <div className="flex-row cursor-pointer space-y-2">
        {locations.map((location) => (
          <Flocation
            key={location._id}
            id={location._id}
            address={location.address}
          />
        ))}
      </div>
    </div>
  );
}
