"use client";
import axios from "axios";
import React from "react";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import locationStyle from "../addpost/page.module.css";
import { BiAccessibility, BiImageAdd } from "react-icons/bi";
import RatingDropdown from "./components/RatingDropdown";

export default function Addpost({ params }: { params: { id: string } }) {
  const router = useRouter();
  const locationId: string = params.id;

  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });
  const userId = session?.data?.user?.email;

  const [Description, setDescription] = useState("");
  const [TrailCondition, setTrialCondition] = useState<null | number>(0);
  const [Weather, setWeather] = useState<null | number>(0);
  const [Accessibility, setAccessibility] = useState<null | number>(0);
  const [imageSrc, setImageSrc] = useState<string>();
  const [uploadData, setUploadData] = useState();
  const [image_URL, setImageUrl] = useState("");

  const handleTrailConditon = (rating: number | null) => {
    console.log("TrailCondition:", rating);
    setTrialCondition(rating);
  };

  const handleWeather = (rating: number | null) => {
    console.log("Weather:", rating);
    setWeather(rating);
  };

  const handleAccessiblity = (rating: number | null) => {
    console.log("Accessibility: ", rating);
    setAccessibility(rating);
  };

  const handleImage = (changeEvent: React.ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent: ProgressEvent<FileReader>): void {
      setImageSrc(onLoadEvent.target!.result as string);
      setUploadData(undefined);
    };
    reader.readAsDataURL(changeEvent.target.files![0]);
  };
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find( (element: Element) => {
      return (element as HTMLInputElement).name === 'file';
    }) as HTMLInputElement;
  
    const formData = new FormData();
    for (const file of Array.from(fileInput.files!)) {
      formData.append('file', file);
    }
  
    formData.append('upload_preset', 'Trek-Diaries');
  
    const data: { secure_url: string } = await fetch('https://api.cloudinary.com/v1_1/dkid8h6ss/image/upload', {
      method: 'POST',
      body: formData,
      cache: 'no-store'
    }).then(r => r.json());
    console.log(data.secure_url);
    setImageUrl(data.secure_url);
  }
    

  /* handleCreatePost triggers an event which passes data to the add_post api */
  const handleCreatePost = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      //checking for Image from cloudinary......
      console.log(`checking URL from cloudinary....: ${image_URL}`);
      console.log(`checking user Mail....: ${userId}`);
      
      // setting overall Rating....
      const finalRating : number = ((Weather??0) + (Accessibility??0) + (TrailCondition??0))/3;
      const overallScore: number = Math.round(finalRating * 100)/100;

      
      console.log(Weather,Accessibility,TrailCondition,finalRating,overallScore);

      // calling restful API addpost
      const { data } = await axios.post("/api/add_post", {
        Description,
        locationId,
        image_URL,
        userId,
        TrailCondition,
        Weather,
        Accessibility,
        overallScore
      });
      if (data) {
        console.log("Data has been sent successfully...");
        router.push(`/location/${params.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={locationStyle.wrapper}>
       <div className={locationStyle.left}></div>
      <div className={locationStyle.forms}>
        <h2>Add Post</h2>
        <form onSubmit={handleSubmit} className={locationStyle.postfield}>
          <input
            className={locationStyle.file}
            type="file"
            name="file"
            onChange={handleImage}
          />
          <img src={imageSrc} className={locationStyle.imgFit} />
          <button type="submit" className={locationStyle.addimg}>
            {" "}
            Add Image <BiImageAdd className={locationStyle.addimgicon} />
          </button>
        </form>
        <form className={locationStyle.postfield1}>
          <textarea
            name="text"
            id="description"
            placeholder="Description (required...)"
            className={locationStyle.inputBx}
            value={Description}
            onChange={(e) => setDescription(e.target.value)} // setting value of Description
          />
          <div className={locationStyle.ratingStar}>
            <div>
            <h3>Trial Condition</h3>
            <RatingDropdown onRatingSelect={handleTrailConditon} />
            </div>
            <div>
            <h3>Weather</h3>
            <RatingDropdown onRatingSelect={handleWeather} />
            </div>
            <div>
            <h3>Accessibility</h3>
            <RatingDropdown onRatingSelect={handleAccessiblity} />
            </div>
            </div>
          <button
            className={locationStyle.createbtn}
            onClick={(e) => handleCreatePost(e)}
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}
