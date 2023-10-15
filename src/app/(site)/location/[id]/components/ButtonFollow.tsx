"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react"
import { FLocationContext, ReloadFLocationContext } from "@/app/(site)/layout";
import { Button } from "@/components/ui/button";
import { UserMinus, UserPlus } from "lucide-react";

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
                <Button onClick={handleToggleFollow} className="flex gap-2 bg-transparent outline-none cursor-pointer text-md rounded-lg transition-all uppercase border-2 border-solid border-teal-600 text-teal-600 hover:bg-gray-300" >
                    Follow<UserPlus className="w-5 h-5"/>
                </Button>
            :
                <Button onClick={ handleToggleFollow } className="flex gap-2 bg-transparent outline-none cursor-pointer text-md rounded-lg transition-all ease-in-out uppercase border-2 border-solid border-teal-600 text-teal-600 hover:bg-gray-300">
                    Unfollow<UserMinus className="w-5 h-5"/>
                </Button>
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