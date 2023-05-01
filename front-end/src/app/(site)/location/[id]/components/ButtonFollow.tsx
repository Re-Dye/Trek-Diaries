"use client"
import { SlUserFollow } from "react-icons/sl";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import locateStyle from "../page.module.css"
import { useContext, useEffect, useState } from "react"
import { FLocationContext } from "@/app/(site)/layout";

export default function ButtonFollow({ locationID }: { locationID: string}) {
    const router = useRouter();
    const locations = useContext(FLocationContext)
    const [followed, setFollowed] = useState<boolean>(false)

    /* Sessions is used to extract email from the users... */
    const session = useSession({
        required: true,
        onUnauthenticated() {
        router.push("/login");
        },
    });

    /* handleFollow handles the follow event, i.e. it adds the location id to the users location */
    const handleFollow = async () => {
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

        console.log(res.json())
        } catch (error) {
        console.log(error);
        }
    };

    const handleUnfollow = async () => {
        console.log("unfollow")
    }

    useEffect(() => {
        locations.map((location) => {
            if(location._id === locationID) {
                setFollowed(true)
            }else{
                setFollowed(false)
            }
        })
    }, [locations])

    return(
        <>
            {(!followed) && 
                <button onClick={handleFollow} className={locateStyle.followbtn}>
                    <SlUserFollow />
                </button>
            }
            {followed &&
                <button onClick={ handleUnfollow } className={locateStyle.followbtn}>
                    Unfollow
                </button>
            }
        </>
    )
}