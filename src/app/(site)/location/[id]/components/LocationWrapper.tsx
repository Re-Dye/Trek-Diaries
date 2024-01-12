"use client";
import { FC } from "react";
import ButtonFollow from "./ButtonFollow";
import AddPost from "./AddPost";
import Posts from "./Posts";
import { LocateFixed } from "lucide-react";
import { ReturnLocation } from "@/lib/zodSchema/dbTypes";

type Props = {
  location: ReturnLocation;
  userId: string | undefined;
};

const LocationWrapper: FC<Props> = (props) => {
  return (
    <div>
      <div className="flex-row text-center p-6 mt-8 m-2 rounded-xl shadow-md dark:bg-black bg-zinc-200">
        <div className="text-lg space-y-4">
          <div className="flex gap-3 justify-center items-center">
            <LocateFixed className="w-6 h-6 text-red-600" />
            <h1 className="text-2xl text-teal-600 font-semibold">{props.location.address}</h1>
          </div>
          <div className="flex p-2 text-start">
          <p className="text-sm">{props.location.description}</p>
          </div>
        </div>
        <div className="flex mt-6 justify-center gap-8">
          {props.userId && (
            <>
              <AddPost locationID={props.location.id} userId={props.userId}/>
              <ButtonFollow locationID={props.location.id} userId={props.userId}/>
            </>
          )}
        </div>
      </div>
      <div>
        <Posts locationId={props.location.id} userId={props.userId}/>
      </div>
    </div>
  );
};

export default LocationWrapper;
