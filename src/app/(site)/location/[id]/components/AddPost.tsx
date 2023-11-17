"use client";
import { Button, ButtonLoading } from "@/components/ui/button";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { PlusCircle } from "lucide-react";

const DialogAddPost = dynamic(() => import("./DialogAddPost"), { ssr: false });

export default function AddPost({ locationID }: { locationID: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = (open: boolean) => setIsOpen(open);
  const handleClick = () => {
    setIsOpen(true);
  };
  const session = useSession({
    required: true,
  });
  return (
    <>
      {session.status !== "authenticated" ? (
        <ButtonLoading />
      ) : (
        <>
        <Button 
          variant="outline" 
          onClick={handleClick} 
          className="flex gap-2 bg-transparent outline-none cursor-pointer text-md rounded-lg transition-all uppercase border-2 border-solid border-teal-600 text-teal-600 hover:bg-gray-300 dark:hover:bg-gray-800"
          >Add Post<PlusCircle className="w-5 h-5"/></Button>
        { isOpen && (
          <DialogAddPost open={isOpen} locationID={locationID} handleOpen={handleOpen} />
        )}
        </>
      )}
    </>
  );
}
