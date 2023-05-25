"use client"
import { SlUserFollow } from "react-icons/sl";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import locateStyle from "../page.module.css"
import { useContext, useEffect, useState } from "react"
import { FLocationContext, ReloadFLocationContext } from "@/app/(site)/layout";

export default function ButtonFollow({ locationID }: { locationID: string}) {
    const router = useRouter();
    const reloadLocations = useContext(ReloadFLocationContext)
    const followed = useGetFollow(locationID)

    /* Sessions is used to extract email from the users... */
    const session = useSession({
        required: true,
        onUnauthenticated() {
        router.push("/login");
        },
    });

    /* handleFollow handles the follow event, i.e. it adds the location id to the users location */
    const handleToggleFollow = async () => {
        const email: any = session.data?.user?.email;
        const encodedEmail: any = encodeURI(email);
        const encodedLocation: any = encodeURI(locationID);

        try {
            const res: Response = await fetch(
                `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/followLocation?locationId=${encodedLocation}&email=${encodedEmail}`,
                {
                method: "POST",
                cache: "no-store",
                }
            )

            reloadLocations()
        } catch (error) {
        console.log(error);
        }
    };

    return(
        <>
            {(!followed)?
                <button onClick={handleToggleFollow} className={locateStyle.followbtn} >
                    + Follow
                </button>
            :
                <button onClick={ handleToggleFollow } className={locateStyle.followbtn}>
                    x Unfollow
                </button>
            }
        </>
    )
}

function useGetFollow(locationID: string): boolean {
    const locations = useContext(FLocationContext)
    const [followed, setFollowed] = useState<boolean>(false)

    useEffect(() => {
        for (let i = 0; i < locations.length; i++) {
            if(locations[i]._id === locationID) {
                setFollowed(true)
                break
            }else{
                setFollowed(false)
            }
        }
    }, [locations])

    return followed
}