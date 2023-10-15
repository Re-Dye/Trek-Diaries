"use client"
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ButtonVerify(){
    const router = useRouter()
    return (
        <Button 
            className="w-full"
            onClick={()=> router.push('/login')}>
            <CheckIcon className="mr-2 h-4 w-4" /> Continue
          </Button>
    )
}