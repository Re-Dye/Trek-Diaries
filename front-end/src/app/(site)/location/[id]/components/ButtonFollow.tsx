"use client"
import { SlUserFollow } from "react-icons/sl";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import locateStyle from "../page.module.css"

export default function ButtonFollow({ locationID }: { locationID: string}) {
    const router = useRouter();

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

    return(
        <button onClick={handleFollow} className={locateStyle.followbtn}>
          <SlUserFollow />
        </button>
    )
}