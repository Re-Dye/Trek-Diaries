"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button, ButtonLoading } from "@/components/ui/button";
import { UserMinus, UserPlus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UsersToLocations,
  usersToLocationsSchema,
} from "@/lib/zodSchema/dbTypes";
import type { Action } from "@/lib/zodSchema/followLocation";
import { useLocationStore } from "@/lib/zustand/location";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function ButtonFollow({ locationID }: { locationID: string }) {
  const {toast} = useToast()
  const queryClient = useQueryClient();
  const followed = useGetFollow(locationID);

  /* Sessions is used to extract email from the users... */
  const session = useSession({
    required: true,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (action: Action) => {
      if (session.status === "authenticated") {
        const userId = session.data.user?.id;
        const data: UsersToLocations = usersToLocationsSchema.parse({
          locationId: locationID,
          userId,
        });
        const res = await fetch("/api/location/follow", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ ...data, action }),
        });

        const message: string = await res.json();
        const status = res.status;
        return { message, status };
      }
    },
    onSuccess: async (data) => {
      if (data === undefined) {
        console.log("Null data received");
        toast({
          className: "fixed rounded-md top-0 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          description: "Error occured while following location. Please try again later."
        })
        return;
      }
      if (data.status === 201) {
        console.log("Location followed successfully, refetching locations")
        await queryClient.refetchQueries({ queryKey: ["locations"]});
        console.log(data.message);
        return;
      } else if (data.status === 409) {
        console.log(data.message);
        toast({
          className: "fixed rounded-md top-0 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          title: "Already Followed",
          description: "You are already following this location"
        })
      } else if (data.status === 400) {
        console.log(data.message);
        toast({
          className: "fixed rounded-md top-2 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          title: "Invalid Request",
          description: "Please try again later with proper information."
        })
      } else {
        console.log(data.message);
        toast({
          variant: "destructive",
          className: "fixed rounded-md top-2 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          description: "Error occured while following location. Please try again later.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    },
    onError: (error) => {
      console.log(error);
      alert(error);
    },
  });

  /* handleFollow handles the follow event, i.e. it adds the location id to the users location */
  const handleToggleFollow = (action: Action) => {
    mutate(action);
    // locations.load();
  };

  return (
    <>
      {isPending || session.status !== "authenticated" ? (
        <ButtonLoading />
      ) : !followed ? (
        <Button
          onClick={() => handleToggleFollow("follow")}
          className="flex gap-2 bg-transparent outline-none cursor-pointer text-md rounded-lg transition-all uppercase border-2 border-solid border-teal-600 text-teal-600 hover:bg-gray-300"
        >
          Follow
          <UserPlus className="w-5 h-5" />
        </Button>
      ) : (
        <Button
          onClick={() => handleToggleFollow("unfollow")}
          className="flex gap-2 bg-transparent outline-none cursor-pointer text-md rounded-lg transition-all ease-in-out uppercase border-2 border-solid border-teal-600 text-teal-600 hover:bg-gray-300"
        >
          Unfollow
          <UserMinus className="w-5 h-5" />
        </Button>
      )}
    </>
  );
}

function useGetFollow(locationID: string): boolean {
  // const locationContext = useContext(LocationContext);
  const locations = useLocationStore((state) => state.locations);
  const [followed, setFollowed] = useState<boolean>(false);

  useEffect(() => {
    if (locations.length === 0) {
      setFollowed(false);
      return;
    }

    for (let i = 0; i < locations.length; i++) {
      if (locations[i].locationId === locationID) {
        setFollowed(true);
        break;
      } else {
        setFollowed(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);

  return followed;
}
