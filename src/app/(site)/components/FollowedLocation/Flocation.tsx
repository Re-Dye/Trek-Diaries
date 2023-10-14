'use client';

import { Pin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Flocation({ id, address }: { id: string, address: string }) {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/location/${ id }`)
    } 

    return(
        <div className="flex gap-2 items-center hover:text-blue-400 text-lg" onClick={ handleClick }>
            <Pin className="w-3 h-3"/> { address }
        </div>
    );
}