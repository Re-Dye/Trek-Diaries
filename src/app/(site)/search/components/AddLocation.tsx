"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const PopoverAddLocation = dynamic(() => import("./PopoverAddLocation"), {
  ssr: false,
});

const AddLocation = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);
  const onOpenChange = (open: boolean) => setOpen(open);
  console.log(open);
  return (
    <>
      <Button onClick={handleClick} variant="default" className="w-1/4 h-10">
        Add Location
      </Button>
      {open && <PopoverAddLocation open={open} onOpenChange={onOpenChange}/>}
    </>
  );
};

export default AddLocation;