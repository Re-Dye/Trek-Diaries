"use client";
import axios from "axios";
import React from "react";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import RatingDropdown from "./components/RatingDropdown";
import { Input } from "@/components/ui/input";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
    const fileInput = Array.from(form.elements).find((element: Element) => {
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
      const finalRating: number = ((Weather ?? 0) + (Accessibility ?? 0) + (TrailCondition ?? 0)) / 3;
      const overallScore: number = Math.round(finalRating * 100) / 100;


      console.log(Weather, Accessibility, TrailCondition, finalRating, overallScore);

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
    <div className="flex justify-between h-screen">
      <div className="w-1/4 bg-custom_gray mt-2 border"></div>
      <div className="mt-2 bg-custom_gray border w-2/4 box-border space-y-2">
        <div className="flex-row text-center p-6 m-2 mt-4 rounded-xl shadow-md border-2 bg-transparent border-teal-600 space-y-10">
          <h2 className="text-teal-500 text-4xl">Add Post</h2>
          <form onSubmit={handleSubmit} className="flex gap-4 justify-center items-center">
            <div>
            <Input
              className="h-8"
              type="file"
              name="file"
              onChange={handleImage}
            />
            </div>
            <div className="flex-row space-y-2">
              <img src={imageSrc} className="w-64 h-32 object-cover" />
              <Button 
                type="submit" 
                className="gap-2 hover:bg-slate-500">
              {" "}
              Add Image <ImagePlus className="w-5 h-5" />
              </Button>
            </div>
          </form>
          <form className="flex-row justify-center items-center space-y-6">
            <Textarea
              name="text"
              id="description"
              placeholder="Description of the post (required...)"
              className="shadow-md border-2"
              value={Description}
              onChange={(e) => setDescription(e.target.value)} // setting value of Description
            />
            <div className="flex justify-between">
              <div className="space-y-1">
                <h3 className="text-sm">Trial Condition</h3>
                <RatingDropdown onRatingSelect={handleTrailConditon} />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm">Weather</h3>
                <RatingDropdown onRatingSelect={handleWeather} />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm">Accessibility</h3>
                <RatingDropdown onRatingSelect={handleAccessiblity} />
              </div>
            </div>
            <Button
              className=" hover:bg-slate-500 w-44"
              onClick={(e) => handleCreatePost(e)}
            >
              Create Post
            </Button>
          </form>
        </div>
      </div>
      <div className="w-1/5 bg-custom_gray border mt-2"></div>
    </div>
  );
}
