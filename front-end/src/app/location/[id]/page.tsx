"use client";
import Header from "./components/Header";
import React from "react";
import locateStyle from "../[id]/page.module.css";
import axios from "axios";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function LocationPage({ params }: { params: { id: string } }) {
  const [Description, setDescription] = useState("");
  const [sceneryRating, setSceneryRating] = useState(0);
  const [expRating, setExpRating] = useState(0);
  const [roadRating, setRoadRating] = useState(0);
  const [overallScore, setOverallScore] = useState(0);
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const locationId: string = params.id;
  const [image_URL,setImageUrl] = useState(""); 

  const router = useRouter();

  /* Sessions is used to extract email from the users... */
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const handleADDPOST = () =>{
    router.push(`/location/${params.id}/addpost`)
  }

  return (
    <div className = {locateStyle.location}>
      <Image className={locateStyle.img} src="/ncpr2.jpg" alt="backgroundImage" fill  />
      <div className={locateStyle.locatefield}>
      <div className={locateStyle.header}>
        <Header id={params.id} />
      </div>
      <button 
      onClick = {handleADDPOST}
      className={locateStyle.addpstbtn}
      > ADD POST</button> 
        <button
        // onClick={handleFollow}
        className={locateStyle.followbtn}
        >FOLLOW</button>
        </div>
    </div>
  );
}
