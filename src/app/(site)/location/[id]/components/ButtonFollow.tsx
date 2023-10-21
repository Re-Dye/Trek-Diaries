"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FLocationContext, ReloadFLocationContext } from "@/app/(site)/layout";
import { Button, ButtonLoading } from "@/components/ui/button";
import { UserMinus, UserPlus } from "lucide-react";
import { useMutation } from "react-query";
import {
  UsersToLocations,
  usersToLocationsSchema,
} from "@/lib/zodSchema/dbTypes";

export default function ButtonFollow({ locationID }: { locationID: string }) {
  const router = useRouter();
  const reloadLocations = useContext(ReloadFLocationContext);
  const followed = useGetFollow(locationID);

  /* Sessions is used to extract email from the users... */
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: "followLocation",
    mutationFn: async () => {
      if (session.status === "authenticated") {
        const userId = session.data.user?.id;
        const data: UsersToLocations = usersToLocationsSchema.parse(
          { locationId: locationID, userId }
        );
        const res = await fetch("/api/location/follow", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
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
      if (data.status === 201) {
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
  const handleToggleFollow = () => {
    mutate();
    reloadLocations();
  };

  return (
    <>
      {isLoading || session.status !== "authenticated" ? (
        <ButtonLoading />
      ) : !followed ? (
        <Button
          onClick={handleToggleFollow}
          className="flex gap-2 bg-transparent outline-none cursor-pointer text-md rounded-lg transition-all uppercase border-2 border-solid border-teal-600 text-teal-600 hover:bg-gray-300"
        >
          Follow
          <UserPlus className="w-5 h-5" />
        </Button>
      ) : (
        <Button
          onClick={handleToggleFollow}
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
  const locations = useContext(FLocationContext);
  const [followed, setFollowed] = useState<boolean>(false);

  useEffect(() => {
    for (let i = 0; i < locations.length; i++) {
      if (locations[i]._id === locationID) {
        setFollowed(true);
        break;
      } else {
        setFollowed(false);
      }
    }
  }, [locations]);

  return followed;
}
