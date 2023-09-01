'use client';

import { useRouter } from "next/navigation";
import locateStyle from "./flocation.module.css";
import {GrMapLocation} from "react-icons/gr"

export default function Flocation({ id, address }: { id: string, address: string }) {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/location/${ id }`)
    } 

    return(
        <div className={locateStyle.followloc} onClick={ handleClick }>

           <GrMapLocation /> { address }
        </div>
    );
}