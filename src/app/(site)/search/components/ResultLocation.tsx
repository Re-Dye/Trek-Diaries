"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function ResultLocation({ id, address, description }: {
  id: string,
  address: string,
  description: string
}) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/location/${id}`)
  }

  return (
    <Card className="flex items-center justify-between rounded-2xl m-2 p-6 shadow-md">
      <div className="flex-row">
        <div className="text-xl flex gap-2 cursor-pointer items-center text-cyan-600 dark:text-cyan-400">
          <MapPin className="w-6 h-6 text-red-500"/>
          <a onClick={ handleClick }>{ address }</a>
        </div>
        <div className="flex mt-3 box-border text-sm p-2 tracking-wide">
            <p>
              { description }
            </p>
        </div>
      </div>
    </Card>
  );
}
