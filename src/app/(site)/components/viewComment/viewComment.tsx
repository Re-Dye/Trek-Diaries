"use client"
import React from "react";
import { Card } from "@/components/ui/card";
import { UserCircle } from "lucide-react";
import handleRegisteredTime from "@/lib/utilities/handleRegisteredTime";

export default function ViewComment ({ content, owner, registeredTime }: {
  content: string,
  owner: string,
  registeredTime: string
}){
    const formattedDiff = handleRegisteredTime(registeredTime)
  return (
    <div className="flex-row p-2">
    <Card className="p-3 mx-4 shadow-md bg-gray-200 dark:bg-custom_gray w-[40rem]">
      <div className="flex-row space-y-3">
        <div className="flex-row gap-2 text-lg">
          <div className="flex gap-2">
            <UserCircle className="w-5 h-5 mt-1" />
            <h3 className="text-cyan-500">{owner}</h3>
          </div>
          <h5 className="text-xs ml-7">{formattedDiff}</h5>
        </div>
        <div className="ml-7">
          <p className="text-sm">
            {content}
          </p>
        </div>
      </div>
    </Card>
    </div>
  );
};

