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
    <div className="mt-2 bg-custom_gray border w-2/4 box-border space-y-2">
      <div className="flex-row text-center p-4 m-2 rounded-xl shadow-md dark:bg-black bg-slate-100">
        <div className="text-lg space-y-4">
          <div className="flex gap-2 justify-center">
            <LocateFixed className="w-6 h-6 text-red-700" />
            <h1 className="text-xl">{props.location.address}</h1>
          </div>
          <p className="text-sm">{props.location.description}</p>
        </div>
        <div className="flex mt-5 justify-center gap-8">
          {props.userId && (
            <>
              <AddPost locationID={props.location.id} userId={props.userId}/>
              <ButtonFollow locationID={props.location.id} userId={props.userId}/>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Posts locationId={props.location.id} userId={props.userId}/>
      </div>
    </div>
  );
};

export default LocationWrapper;
