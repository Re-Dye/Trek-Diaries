'use client';

import locateStyle from "./flocation.module.css";

export default function Flocation({ id, address }: { id: string, address: string }) {
    return(
        <div className={locateStyle.followloc}>
            <div>
                { address }
            </div>
        </div>
    );
}