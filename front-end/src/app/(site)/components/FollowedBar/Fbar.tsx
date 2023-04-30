"use client"
import followStyle from "./fbar.module.css";
import { SessionContextValue, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Flocation from "../FollowedLocation/Flocation";

interface Location {
    _id: string;
    address: string;
}

const getFollowedLocations = async(email: string) => {
    const res = await fetch(
        `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/getFollowedLocations?email=${ email }`,
        { cache: 'no-store'}
    )
    return res.json()
}

export default function Fbar() {
    const router = useRouter()

    /* Sessions is used to extract email from the users... */
    const session = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/login");
        },
    });
    
    const locations = useFetchLocations(session)

    return(
        <div className={followStyle.followbar}>
            <div className={followStyle.followLocation}>
            {
                locations.map((location) => (
                    <Flocation
                        key={ location._id }
                        id={ location._id }
                        address={ location.address }
                    />
                ))
            }
            </div>
        </div>
    );
}


function useFetchLocations(session: SessionContextValue) {
    const [locations, setLocations] = useState<Array<Location>>([])

    useEffect(() => {
        if (session.status === "authenticated" && session.data.user) {
            const getData = async() => {
                const followedLocations = await getFollowedLocations(session.data.user?.email as string)
                setLocations(followedLocations)
            }
            getData()
        }
    }, [session])

    useEffect(() => {
        console.log(locations)
    }, [locations])

    return locations
}