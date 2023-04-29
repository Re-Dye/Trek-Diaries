"use client";
import Header from "./components/Header";
import React from "react";
import locateStyle from "../[id]/page.module.css";
import axios from "axios";
import Image from "next/image";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useSession } from "next-auth/react";
import {SlUserFollow} from "react-icons/sl";

export default function LocationPage({ params }: { params: { id: string } }) {
  const locationId: string = params.id;
  const router = useRouter();

  /* Sessions is used to extract email from the users... */
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  /* HandleADDPOST redirects to the addpost page */
  const handleADDPOST = () => {
    router.push(`/location/${params.id}/addpost`);
  };

  /* handleFollow handles the follow event, i.e. it adds the location id to the users location */
  const handleFollow = async () => {
    const email: any = session.data.user.email;
    const encodedEmail: any = encodeURI(email);
    const encodedLocation: any = encodeURI(params.id);

    try {
      const res: Response = await fetch(
        `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/followLocation?locationId=${encodedLocation}&email=${encodedEmail}`,
        {
          method: "POST",
          cache: "no-store",
        }
      );

      if (res) {
        console.log("location has been added");
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={locateStyle.location}>
      <div className={locateStyle.locatefield}>
        <div className={locateStyle.header}>
          <Header id={params.id} />
        </div>
        <button onClick={handleADDPOST} className={locateStyle.addpstbtn}>
          {" "}
          ADD POST
        </button>
        <button onClick={handleFollow} className={locateStyle.followbtn}>
          <SlUserFollow />
        </button>
      </div>
    </div>
  );
}
