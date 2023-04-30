'use client';

import { useState } from "react";
import locateStyle from "./flocation.module.css";

export default function Flocation()
{
    return(
        <div className={locateStyle.followloc}>
            <div>
                Followed Location
            </div>
        </div>
    );
}