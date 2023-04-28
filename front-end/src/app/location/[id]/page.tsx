"use client";
import Header from "./components/Header";
import React from "react";
import postStyle from "../../page.module.css";
import axios from "axios";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useSession } from "next-auth/react";

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
    <div className = "location">
      <div className="header">
        <Header id={params.id} />
      </div>
      <button onClick = {handleADDPOST}> ADD POST</button>        
    </div>
  );
}
