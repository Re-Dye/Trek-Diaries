import { Loader2 } from "lucide-react";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex text-lg justify-center gap-2">
            Loading Locations...<Loader2 className="w-6 h-6 animate-spin"/>
        </div>
    )
}