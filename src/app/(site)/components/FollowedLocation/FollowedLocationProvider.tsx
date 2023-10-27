"use client";
import { createContext, useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import type { UsersToLocations } from "@/lib/zodSchema/dbTypes";
import type { Prettify } from "@/lib/prettify";

type Location = Prettify<UsersToLocations & { address: string }>;
type ContextType = {
  locations: Array<Location>;
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
  isPending: boolean;
  isError: boolean;
  load: () => void;
};

export const LocationContext = createContext<ContextType>({
  locations: [],
  setLocations: () => {},
  isPending: false,
  isError: false,
  load: () => {},
});

export default function FollowedLocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locations, setLocations] = useState<Array<Location>>([]);
  const session = useSession();
  const mounted = useRef(false);
  const { mutate, isError, isPending, variables } = useMutation({
    mutationKey: ["locations"],
    mutationFn: async () => {
      console.log("getting locations")
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
        setLocations(JSON.parse(data.message));
        console.log(data.message)
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
    if (!mounted.current && session.status === "authenticated") {
      mutate();
      return () => {
        mounted.current = true;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const load = useCallback(() => {
    mutate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue: ContextType = useMemo(
    () => ({
      locations: locations,
      setLocations,
      isPending,
      isError,
      load
    }),
    [locations, isPending, isError, load]
  );

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
}
