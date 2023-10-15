import { Navigation, Palmtree } from "lucide-react";
import Image from "next/image";

export default function PlacetoVisit(){
    return(
        <div className="flex-row absolute space-y-4 right-4 mt-8 box-border border rounded-2xl shadow-md p-6">
            <div className="flex gap-3">
                <h2 className="text-2xl">Places to Visit</h2>
                <Palmtree className="w-7 h-7 text-green-500"/>
            </div>
            <div className="overflow-y-auto h-96 space-y-3 ">
            <div className="flex-row space-y-1">
                <div className="flex relative w-40 h-32 justify-center items-center">
                <Image 
                    className="object-cover rounded-xl"
                    fill
                    src="/mardi.jpg"
                    alt="visitimage"
                     />
                </div>
                <div className="flex text-xs justify-center">
                    <h3>Mardi Himal Trek</h3>
                </div>
            </div>
            <div className="flex-row space-y-1">
                <div className="flex relative w-40 h-32 justify-center items-center">
                <Image 
                    className="object-cover rounded-xl"
                    fill
                    src="/tilicho.jpg"
                    alt="visitimage"
                     />
                </div>
                <div className="flex text-xs justify-center">
                    <h3>Tilicho Lake</h3>
                </div>
            </div>
            <div className="flex-row space-y-1">
                <div className="flex relative w-40 h-32 justify-center items-center">
                <Image 
                    className="object-cover rounded-xl"
                    fill
                    src="/abc.jpg"
                    alt="visitimage"
                     />
                </div>
                <div className="flex text-xs justify-center">
                    <h3>Annapurna Base Camp</h3>
                </div>
            </div>
            <div className="flex-row space-y-1">
                <div className="flex relative w-40 h-32 justify-center items-center">
                <Image 
                    className="object-cover rounded-xl"
                    fill
                    src="/gosaikunda.png"
                    alt="visitimage"
                     />
                </div>
                <div className="flex text-xs justify-center">
                    <h3>Gosaikunda Trek</h3>
                </div>
            </div>
            <div className="flex-row space-y-1">
                <div className="flex relative w-40 h-32 justify-center items-center">
                <Image 
                    className="object-cover rounded-xl"
                    fill
                    src="/rara.jpg"
                    alt="visitimage"
                     />
                </div>
                <div className="flex text-xs justify-center">
                    <h3>Rara Lake</h3>
                </div>
            </div>
            <div className="flex-row space-y-1">
                <div className="flex relative w-40 h-32 justify-center items-center">
                <Image 
                    className="object-cover rounded-xl"
                    fill
                    src="/peakey.jpg"
                    alt="visitimage"
                     />
                </div>
                <div className="flex text-xs justify-center">
                    <h3>Peakey Peak Trek</h3>
                </div>
            </div>
            <div className="flex-row space-y-1">
                <div className="flex relative w-40 h-32 justify-center items-center">
                <Image 
                    className="object-cover rounded-xl"
                    fill
                    src="/langtang.jpg"
                    alt="visitimage"
                     />
                </div>
                <div className="flex text-xs justify-center">
                    <h3>Langtang Trek</h3>
                </div>
            </div>
        </div>
        </div>
    );
}