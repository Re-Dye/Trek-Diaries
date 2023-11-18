"use client";
import Image from "next/image";
import Comment from "./comment_sec/Comment";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Star from "./star";
import FinalRating from "./finalRating";
import { ThumbsUp, UserCircle } from "lucide-react";
import handleRegisteredTime from "@/lib/utilities/handleRegisteredTime";

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
  registeredTime: string;
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
    <div className="flex-row items-center justify-between rounded-2xl m-2 p-4 gap-10 shadow-md dark:bg-black bg-slate-100">
      <div className="flex-row space-y-4">
        <div className="flex-row">
          <div className="flex gap-2">
            <UserCircle className="w-7 h-7" />
            <h3 className="text-xl">{name}</h3>
          </div>
          <h5 className="ml-9 opacity-50">{handleRegisteredTime(registeredTime)}</h5>
        </div>
        <div className="relative w-full h-60">
          <Image
            className=" rounded-2xl object-contain"
            alt="Error: Image could not be loaded."
            fill={true}
            src={pictureURL}
          />
        </div>
      </div>
      <div className="flex-row space-y-2">
        <div className="flex justify-between p-4 mt-3 gap-4 rounded-xl shadow-md border-2 bg-transparent border-teal-600">
          <div className="box-border space-y-6">
            <p className="text-sm text-left overflow-y-scroll">{description}</p>
            <div className="flex gap-3 cursor-pointer">
              <div className="text-xl">{Likes}</div>
              <ThumbsUp
                className="w-6 h-6 hover:text-blue-600"
                onClick={handleLike}
              />
            </div>
          </div>
          <div className="flex gap-16">
          <div className="flex-row space-y-1">
            <div className="TrialCondition">
              <h4>
                TrialCondition: <Star stars={rating.TrailCondition} />
              </h4>
            </div>
            <div className="Weather">
              <h4>
                Weather: <Star stars={rating.Weather} />
              </h4>
            </div>
            <div className="Accessibility">
              <h4>
                Accessibility: <Star stars={rating.Accessibility} />
              </h4>
            </div>
          </div>
          <div className="flex justify-center items-center">
              <FinalRating stars={rating.overallScore} />
          </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Comment postId={postID} />
        </div>
      </div>
    </div>
  );
}
