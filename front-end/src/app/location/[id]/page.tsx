"use client";
import Header from "./components/Header";
import React from "react";
import postStyle from "../[id]/page.module.css";
import axios from "axios";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, Dropdown, Spacer } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import {AiFillStar} from "react-icons/ai"
import Image from "next/image";

export default function LocationPage({ params }: { params: { id: string } }) {

  const [Description, setDescription] = useState("");
  const [sceneryRating, setSceneryRating] = useState(0);
  const [expRating, setExpRating] = useState(0);
  const [roadRating, setRoadRating] = useState(0);
  const [overallScore, setOverallScore] = useState(0);
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  // single selection of rating in pulldown button
  const [selected, setSelected] = useState(new Set(["Rating"]));
  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const [selected1, setSelected1] = useState(new Set(["Rating"]));
  const selectedValue1 = React.useMemo(
    () => Array.from(selected1).join(", ").replaceAll("_", " "),
    [selected1]
  );
  const [selected2, setSelected2] = useState(new Set(["Rating"]));
  const selectedValue2 = React.useMemo(
    () => Array.from(selected2).join(", ").replaceAll("_", " "),
    [selected2]
  );
  const [selected3, setSelected3] = useState(new Set(["Rating"]));
  const selectedValue3 = React.useMemo(
    () => Array.from(selected1).join(", ").replaceAll("_", " "),
    [selected3]
  );
  

  const locationId: string = params.id;

  const router = useRouter();


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
    event.preventDefault();
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
        <Image src="/ncpr2.jpg" alt="backgroundImage" fill  />
            <form onSubmit = {handleSubmit} className={postStyle.postfield}>
            <h2>Add Post</h2>               
              <img src = {imageSrc} className={postStyle.imgFit}/>
              <div className={postStyle.header}>
              <Header id={params.id} />
              </div>
              <input
                id="image"
                className={postStyle.inp}
                type="file"
                onChange={handleImage}
                />
                <textarea 
                  name="content"
                  id="description"
                  placeholder="Description"
                  className={postStyle.inputBx}
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)} // setting value of Description
                />
                <div className={postStyle.ratingStar}>
                <div>
                <h3>Scenery</h3>
                <Dropdown>
                  <Dropdown.Button flat color="secondary">
                    {selectedValue}
                  </Dropdown.Button>
                  <Dropdown.Menu
                      aria-label="Single selection actions"
                      color="primary"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selected}
                      onSelectionChange={setSelected}
                  >
                    <Dropdown.Item key="1 star" color="warning"><AiFillStar /></Dropdown.Item>
                    <Dropdown.Item key="2 star" color="warning"><AiFillStar /><AiFillStar /></Dropdown.Item>
                    <Dropdown.Item key="3 star" color="warning"><AiFillStar /><AiFillStar /><AiFillStar /></Dropdown.Item>
                    <Dropdown.Item key="4 star" color="warning"><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /></Dropdown.Item>
                    <Dropdown.Item key="5 star" color="warning"><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /></Dropdown.Item>
                    
                  </Dropdown.Menu>
                  </Dropdown>
                  </div>
                  <div>
                <h3>Road Condition</h3>
                <Dropdown>
                  <Dropdown.Button flat color="secondary">
                    {selectedValue1}
                  </Dropdown.Button>
                  <Dropdown.Menu
                      aria-label="Single selection actions"
                      color="primary"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selected1}
                      onSelectionChange={setSelected1}
                  >
                    <Dropdown.Item key="1 star" color="warning"><AiFillStar /></Dropdown.Item>
                    <Dropdown.Item key="2 star" color="warning"><AiFillStar /><AiFillStar /></Dropdown.Item>
                    <Dropdown.Item key="3 star" color="warning"><AiFillStar /><AiFillStar /><AiFillStar /></Dropdown.Item>
                    <Dropdown.Item key="4 star" color="warning"><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /></Dropdown.Item>
                    <Dropdown.Item key="5 star" color="warning"><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /></Dropdown.Item>
                    
                  </Dropdown.Menu>
                  </Dropdown>
                  </div>
                  <div>
                <h3>Experience</h3>
                <Dropdown>
                  <Dropdown.Button flat color="secondary">
                    {selectedValue2}
                  </Dropdown.Button>
                  <Dropdown.Menu
                      aria-label="Single selection actions"
                      color="primary"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selected2}
                      onSelectionChange={setSelected2}
                  >
                    <Dropdown.Item key="1 star" color="warning"><AiFillStar /></Dropdown.Item>
                    <Dropdown.Item key="2 star" color="warning"><AiFillStar /><AiFillStar /></Dropdown.Item>
                    <Dropdown.Item key="3 star" color="warning"><AiFillStar /><AiFillStar /><AiFillStar /></Dropdown.Item>
                    <Dropdown.Item key="4 star" color="warning"><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /></Dropdown.Item>
                    <Dropdown.Item key="5 star" color="warning"><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /></Dropdown.Item>
                    
                  </Dropdown.Menu>
                  </Dropdown>
                  </div>
                  <div>
                <h3>Overall Rating</h3>
                <Dropdown>
                  <Dropdown.Button flat color="secondary">
                    {selectedValue3}
                  </Dropdown.Button>
                  <Dropdown.Menu
                      aria-label="Single selection actions"
                      color="primary"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selected3}
                      onSelectionChange={setSelected3}
                  >
                    <Dropdown.Item key="1 star" color="warning"><AiFillStar /></Dropdown.Item>
                    <Dropdown.Item key="2 star" color="warning"><AiFillStar /><AiFillStar /></Dropdown.Item>
                    <Dropdown.Item key="3 star" color="warning"><AiFillStar /><AiFillStar /><AiFillStar /></Dropdown.Item>
                    <Dropdown.Item key="4 star" color="warning"><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /></Dropdown.Item>
                    <Dropdown.Item key="5 star" color="warning"><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /></Dropdown.Item>
                    
                  </Dropdown.Menu>
                  </Dropdown>
                  </div>
              </div>
              <button
              className={postStyle.btn} 
              onClick={(e) => handleCreatePost(e)}>
              Create Post</button>
            </form>
    </div>
  );
}
