"use client";
import { Button, ButtonLoading } from "@/components/ui/button";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

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
        <Button variant="outline" onClick={handleClick}>Add Post</Button>
        { isOpen && (
          <DialogAddPost open={isOpen} locationID={locationID} handleOpen={handleOpen} />
        )}
        </>
      )}
    </>
  );
}
