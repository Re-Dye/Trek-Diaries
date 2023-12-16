"use client"
import React from "react";
import { Card } from "@/components/ui/card";
import { UserCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useInView } from "react-intersection-observer";
import { CONSTANTS } from "@/lib/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import handleRegisteredTime from "@/lib/utilities/handleRegisteredTime";

export default function ViewComment ({ content, owner, registeredTime }: {
  content: string,
  owner: string,
  registeredTime: string
}){
    const formattedDiff = handleRegisteredTime(registeredTime)
  return (
<Card className="flex-row p-2 m-1 shadow-md bg-custom_gray opacity-70 space-x-2 mt-3">
    <div className="flex justify-end">
      <h5 className="text-xs">{formattedDiff}</h5>
    </div>
  <div className="flex-row">
    <div className="flex gap-2 text-lg">
      <UserCircle className="w-5 h-5 mt-1" />
      <h3>{owner}</h3>
    </div>
    <div className="ml-7">
      <p className="text-sm">
        {content}
      </p>
    </div>
  </div>
</Card>
  );
};

