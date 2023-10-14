"use client"
import Flocation from "../FollowedLocation/Flocation";
import { Location } from "../../layout";
import { MapPin } from "lucide-react";

export default function Fbar({ locations }: { locations: Array<Location> }) {
    return (
        <div className="flex-row absolute text-xl box-border space-y-6 mt-8 left-5 rounded-2xl border p-8 shadow-md">
            <div className="flex gap-2">
                <h2 className="text-2xl">Followed Locations</h2>
                <MapPin className="w-7 h-7 text-red-600" />
            </div>
            <div className="flex-row cursor-pointer space-y-2">
                {
                    locations.map((location) => (
                        <Flocation
                            key={location._id}
                            id={location._id}
                            address={location.address}
                        />
                    ))
                }
            </div>
        </div>
    );
}