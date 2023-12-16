'use client';

import { Pin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Flocation({ id, address }: { id: string, address: string }) {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/location/${ id }`)
    } 

    return(
        <div className="flex gap-1 lg:gap-2 items-center truncate hover:text-blue-400 text-[8px] sm:text-xs lg:text-lg" onClick={ handleClick }>
            <Pin className="w-2 h-2 lg:w-3 lg:h-3"/> { address }
        </div>
    );
}