import React from "react";
import { Card } from "@/components/ui/card";
import { UserCircle } from "lucide-react";

const ViewComment = ({ content, owner, registeredTime }: {
  content: string,
  owner: string,
  registeredTime: Date
}) => {
  const storedDate = new Date(registeredTime);
  const now = new Date();
  const diff = now.getTime() - storedDate.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  let formattedDiff;
  if (days >= 1) {
    formattedDiff = days + "d ago";
  } else if (hours >= 1) {
    formattedDiff = hours + "h ago";
  } else if (minutes >= 1) {
    formattedDiff = minutes + "m ago";
  } else {
    formattedDiff = seconds + "s ago";
  }
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

export default ViewComment;
