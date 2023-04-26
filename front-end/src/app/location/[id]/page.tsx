"use client";
import Header from "./components/Header";
import React from "react";
import postStyle from "../../page.module.css";
import axios from "axios";
import ReactStars from "react-stars";
import { Suspense } from "react";
import { useState } from "react";
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
      <div className="modal">
        <div className="overlay">
          <div className="modal-content">
            <h2>Add Post</h2>
            <form>
              <div className="add">
                <p>
                  <input type="file" name="file" />
                </p>
                <img src={imageSrc} />
                {imageSrc && !uploadData && (
                  <p>
                    <button>Upload Image</button>
                  </p>
                )}
                {/* {uploadData && (
                <code><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>
                )} */}
                <label htmlFor="description">Description:</label>
                <input
                  id="description"
                  placeholder="Description"
                  className={postStyle.inputBx}
                  type="text"
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)} // setting value of Description
                />
                <br />
                <label htmlFor="scenery">Scenery:</label>
                <ReactStars
                  id="scenery"
                  count={5}
                  size={24}
                  color2={"#ffd700"}
                  onChange={(sceneryRating) => {
                    setSceneryRating(sceneryRating);
                  }}
                />
                <br />
                <label htmlFor="Road">Road:</label>
                <ReactStars
                  id="Road"
                  count={5}
                  size={24}
                  color2={"#ffd700"}
                  onChange={(roadRating) => {
                    setRoadRating(roadRating);
                  }}
                />
                <br />
                <label htmlFor="Experience">Exp:</label>
                <ReactStars
                  id="Experience"
                  count={5}
                  size={24}
                  color2={"#ffd700"}
                  onChange={(expRating) => {
                    setExpRating(expRating);
                  }}
                />
                <br />
                <label htmlFor="overall">Overall:</label>
                <ReactStars
                  count={5}
                  size={34}
                  color2={"#ffd700"}
                  onChange={(overallScore) => {
                    setOverallScore(overallScore);
                  }}
                />
                <br />
                <button onClick={(e) => handleCreatePost(e)}>
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
