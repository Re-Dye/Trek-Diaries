"use client";
import { AiTwotoneLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import "./postLayout.css";
import Image from "next/image";
import ViewComment from "./comment/viewComment";
import Comment from "./comment_sec/Comment";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Star from "./star";
import FinalRating from "./finalRating";

export default function Post({
  address,
  name,
  likes,
  registeredTime,
  description,
  pictureURL,
  postID,
  rating,
}: {
  address: string;
  name: string;
  likes: number;
  registeredTime: Date;
  description: string;
  pictureURL: string;
  postID: string;
  rating: {
    TrailCondition: number;
    Weather: number;
    Accessibility: number;
    overallScore: number;
  };
}) {
  const storedDate = new Date(registeredTime);
  const now = new Date();
  const diff = now.getTime() - storedDate.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  let formattedDiff;
  if (days >= 1) {
    formattedDiff = days + "d ago";
  } else if (hours >= 1) {
    formattedDiff = hours + "h ago";
  } else if (minutes >= 1) {
    formattedDiff = minutes + "m ago";
  } else {
    formattedDiff = seconds + "s ago";
  }

  const [Likes, setLike] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const email: any = session.data?.user?.email;

  const handleLike = async () => {
    const encodedEmail = encodeURI(email);
    const eoncodedPostId = encodeURI(postID);
    try {
      const res: Response = await fetch(
        `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/likePost?postId=${eoncodedPostId}&email=${encodedEmail}`,
        {
          method: "POST",
          cache: "no-store",
        }
      );
      setLike(isLiked ? likes : likes + 1); // Toggle between increment and decrement based on isLiked state
      setIsLiked(!isLiked); // Toggle the isLiked state
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper">
      <div className="leftCtn">
        <div className="imgCtn">
          <Image
            alt="Error: Image could not be loaded."
            fill={true}
            style={{ objectFit: "cover" }}
            src={pictureURL}
          />
        </div>
      </div>
      <div className="rightCtn">
        <div className="rTop">
          <h3 className="uName">{name}</h3>
          <h5 className="time">{formattedDiff}</h5>
        </div>
        <div className="rating">
          <div className="lRating">
            <div className="TrialCondition">
              <h4>
                TrialCondition: <Star stars={rating.TrailCondition} />
              </h4>

              {/* <h4>TrialCondition: {rating.TrailCondition}</h4> */}
            </div>
            <div className="Weather">
              <h4>
                Weather: <Star stars={rating.Weather} />
              </h4>
              {/* <h4>Weather: {rating.Weather}</h4> */}
            </div>
            <div className="Accessibility">
              <h4>
                Accessibility: <Star stars={rating.Accessibility} />
              </h4>
              {/* <h4>Accessibility: {rating.Accessibility}</h4> */}
            </div>
          </div>
          <div className="rRating">
            <FinalRating stars={rating.overallScore} />
            {/* <h4>Final: {rating.overallScore}</h4> */}
          </div>
        </div>
        <div className="rDesc">
          <p className="description">{description}</p>
        </div>
        <div className="rReact">
          <AiTwotoneLike
            className="icons like"
            size={35}
            onClick={handleLike}
          />
          {Likes}
        </div>

        <div className="rComment">
          <Comment postId={postID} />
        </div>
      </div>
    </div>
  );
}
