'use client';

import { useState } from "react";
import followStyle from "./fbar.module.css";

export default function Fbar()
{
    return(
        <div className={followStyle.followbar}>
            <div>
                Followed Bar
            </div>
        </div>
    );
}