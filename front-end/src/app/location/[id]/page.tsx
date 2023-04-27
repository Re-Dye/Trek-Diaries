"use client";
import Header from "./components/Header";
import React from "react";
import postStyle from "../../page.module.css";
import axios from "axios";
import ReactStars from "react-stars";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Grid,
  Modal,
  Spacer,
  Textarea,
  Button,
  Text,
  Input,
} from "@nextui-org/react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useSession } from "next-auth/react";

export default function LocationPage({ params }: { params: { id: string } }) {
  const [visible, setVisible] = useState(false);
  const [Description, setDescription] = useState("");
  const [sceneryRating, setSceneryRating] = useState(0);
  const [expRating, setExpRating] = useState(0);
  const [roadRating, setRoadRating] = useState(0);
  const [overallScore, setOverallScore] = useState(0);
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const locationId: string = params.id;
  var image_URL: string; 

  const router = useRouter();

  /*Visible is used to hide or show the modal */
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };

  /* Sessions is used to extract email from the users... */
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const handleImage = (changeEvent) => {
    let reader = new FileReader();
    reader.onload = function(onLoadEvent){
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    }
    reader.readAsDataURL(changeEvent.target.files[0]);
  }

    async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');
    console.log(fileInput)

    const formData = new FormData();
    for(const file of fileInput.files){
      formData.append('file',file)
    }

    formData.append('upload_preset','Trek-Diaries');

    const data : any = await fetch('https://api.cloudinary.com/v1_1/dkid8h6ss/image/upload', {
      method: 'POST',
      body: formData,
      cache: 'no-store'}).then(r=>r.json());
    console.log(data.secure_url);
    image_URL = data.secure_url;
  }

  /* handleCreatePost triggers an event which passes data to the add_post api */
  const handleCreatePost = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      console.log(`this is url: ${image_URL}`)
      const { data } = await axios.post("/api/add_post", {
        Description,
        locationId,
        image_URL
      });
      if (data) {
        console.log("Data has been sent successfully...");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={postStyle.wrapper}>
      <div className={postStyle.postfield}>
        <Header id={params.id} />
      </div>
        <h2>Add Post</h2>
        <div className="ImageSection">
            <form onSubmit = {handleSubmit}>
                <input type="file" name ="file" onChange={handleImage} />
                <button type = "submit"> Add Image </button>
            </form>
        </div>
            <div> 
                <form>       
                <label htmlFor="description">Description:</label>
                <input
                  id="description"
                  placeholder="Description"
                  className={postStyle.inputBx}
                  type="text"
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)} // setting value of Description
                />
                <button onClick={(e) => handleCreatePost(e)}>
                  Create Post
                </button>
                <img src = {imageSrc}/>
            </form>
        </div>
    </div>
  );
}
