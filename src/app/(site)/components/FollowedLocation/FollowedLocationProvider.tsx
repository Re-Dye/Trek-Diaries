"use client";
import {
  createContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import type { UsersToLocations } from "@/lib/zodSchema/dbTypes";
import type { Prettify } from "@/lib/prettify";

type Location = Prettify<UsersToLocations & { address: string }>;
type ContextType = {
  locations: Array<Location>;
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
  status: "error" | "success" | "pending";
};

export const LocationContext = createContext<ContextType>({
  locations: [],
  setLocations: () => {},
  status: "pending",
});

export default function FollowedLocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locations, setLocations] = useState<Array<Location>>([]);
  const session = useSession();
  // const mounted = useRef(false);
  const { data, error, status,  } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      // if (session.status === "authenticated") {
      const userId = session.data?.user?.id;
      console.log(userId)

      const res = await fetch(`/api/location/get?userId=${userId}`, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      const message: string = await res.json();
      const status = res.status;
      console.log(message, status)
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
        console.log("setting locations");
        setLocations(JSON.parse(data.message));
        console.log(data.message);
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
  }, [status, data])

  const contextValue: ContextType = useMemo(
    () => ({
      locations: locations,
      setLocations,
      status
    }),
    [locations, status]
  );

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
}
