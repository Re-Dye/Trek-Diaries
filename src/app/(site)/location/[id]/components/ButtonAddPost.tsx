"use client"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function ButtonAddPost({ locationID }: { locationID: string }) {
    const router = useRouter();

    /* HandleADDPOST redirects to the addpost page */
    const handleADDPOST = () => {
        router.push(`/location/${ locationID }/addpost`);
    };

    return(
        <Button onClick={handleADDPOST} className="flex gap-2 bg-transparent outline-none cursor-pointer text-md rounded-lg transition-all uppercase border-2 border-solid border-teal-600 text-teal-600 hover:bg-gray-300">
          ADD POST<PlusCircle className="w-5 h-5"/>
        </Button>
    )
}