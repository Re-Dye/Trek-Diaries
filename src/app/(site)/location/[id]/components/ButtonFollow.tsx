"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { LocationContext } from "@/app/(site)/components/FollowedLocation/FollowedLocationProvider";
import { Button, ButtonLoading } from "@/components/ui/button";
import { UserMinus, UserPlus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import {
  UsersToLocations,
  usersToLocationsSchema,
} from "@/lib/zodSchema/dbTypes";
import type { Action } from "@/lib/zodSchema/followLocation";

export default function ButtonFollow({ locationID }: { locationID: string }) {
  const locationContext = useContext(LocationContext);
  const router = useRouter();
  const queryClient = useQueryClient();
  const followed = useGetFollow(locationID);

  /* Sessions is used to extract email from the users... */
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
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
        alert(
          "Error occured while following location. Please try again later."
        );
        return;
      }
      if (data.status === 201) {
        console.log("Location followed successfully, refetching locations")
        await queryClient.refetchQueries({ queryKey: ["locations"]});
        console.log(data.message);
        return;
      } else if (data.status === 409) {
        console.log(data.message);
        alert("You are already following this location");
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
  const locationContext = useContext(LocationContext);
  const [followed, setFollowed] = useState<boolean>(false);

  useEffect(() => {
    if (locationContext.locations.length === 0) {
      setFollowed(false);
      return;
    }

    for (let i = 0; i < locationContext.locations.length; i++) {
      if (locationContext.locations[i].locationId === locationID) {
        setFollowed(true);
        break;
      } else {
        setFollowed(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationContext.locations]);

  return followed;
}
