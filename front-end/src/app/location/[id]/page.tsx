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

  const handleSubmit = (event) => {
    e.preventDefault();
    console.log(event);
  }

  /* handleCreatePost triggers an event which passes data to the add_post api */
  const handleCreatePost = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/add_post", {
        Description,
        locationId,
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
        <div className="overlay">
            <form onSubmit = {handleSubmit}>
              <div className="add">
                <input type="file" onChange={handleImage} />
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
              </div>
            </form>
        </div>
    </div>
  );
}
