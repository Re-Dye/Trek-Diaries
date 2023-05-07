"use client"
import axios from "axios";
import React from "react";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import locationStyle from "../addpost/page.module.css"
import {AiFillStar} from "react-icons/ai"
import { Dropdown } from "@nextui-org/react";
import {BiImageAdd} from "react-icons/bi";

export default function Addpost({ params }: { params: { id: string } }) {
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

    const session = useSession({
      required: true,
      onUnauthenticated() {
        router.push("/login");
      },
    });

    const userId = session?.data?.user?.email

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


    const handleImage = (changeEvent) => {
        let reader = new FileReader();
        reader.onload = function(onLoadEvent){
          setImageSrc(onLoadEvent.target.result);
          setUploadData(undefined);
        }
        reader.readAsDataURL(changeEvent.target.files[0]);
      }
    
        async function handleSubmit(event: any) {
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
        setImageUrl(data.secure_url);
      }
    
      /* handleCreatePost triggers an event which passes data to the add_post api */
      const handleCreatePost = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
          console.log(`this is url: ${image_URL}`)
          console.log(`this is userid: ${userId}`)
          const { data } = await axios.post("/api/add_post", {
            Description,
            locationId,
            image_URL,
            userId
          });
          if (data) {
            console.log("Data has been sent successfully...");
            router.push(`/location/${params.id}`)
          }
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <div className = {locationStyle.wrapper}>
        <div className={locationStyle.forms}>
          <h2>Add Post</h2>
            <form onSubmit = {handleSubmit} className={locationStyle.postfield}>
                <input 
                className={locationStyle.file}
                type="file" 
                name ="file" 
                onChange={handleImage} />
                <img src = {imageSrc} className={locationStyle.imgFit}/>
                <button 
                type = "submit"
                className={locationStyle.addimg}> Add Image <BiImageAdd className={locationStyle.addimgicon}/></button>
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
                  </div>
                <button 
                className={locationStyle.createbtn} 
                onClick={(e) => handleCreatePost(e)}>
                Create Post</button>
            </form>
        </div>
      </div>
    )
    
}