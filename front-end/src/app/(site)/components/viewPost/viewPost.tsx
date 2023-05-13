import postStyles from "./page.module.css";
import { AiTwotoneLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { ClassNames } from "@emotion/react";

interface Owner {
  name: string;
}

//{id, location, description, likes, imageURL, owner}
export default function ViewPost({
  id,
  location,
  description,
  likes,
  imageURL,
  owner,
}: {
  id: string;
  location: any;
  description: string;
  likes: number;
  imageURL: string;
  owner: Owner;
}) {
  const [Color, setColor] = useState("grey");
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
  const handleColor = () => {
    if (isLiked) {
      setColor("blue");
    } else {
      setColor("grey");
    }
  };

  const handleComment = () => {
    router.push(`/post/${id}`);
  };

  const handleLike = async () => {
    const encodedEmail = encodeURI(email);
    const eoncodedPostId = encodeURI(id);
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
    <div className={postStyles.wrapper}>
      <div className={postStyles.left}>
        <div className={postStyles.Tleft}>
          <h3>{location.address}</h3>
        </div>
        <div className={postStyles.Bleft}>
          <div className={postStyles.imgCtn}>
            <Image
              alt="Error: Image could not be loaded."
              width="1000"
              height="500"
              src={imageURL}
            />
          </div>
        </div>
      </div>
      <div className={postStyles.right}>
        <div className={postStyles.rTop}>
          <h3 className={postStyles.uName}>{owner?.name}</h3>
          <h5 className={postStyles.time}>12h</h5>
        </div>
        <div className={postStyles.rCenter}>
          <p className={postStyles.description}>
            Here is the description of the place: <br />
            {description}
          </p>
        </div>
        <div className={postStyles.rBottom}>
          <button
            className={`${postStyles.icons} ${postStyles.like}`}
            color={`${Color}`}
            onClick={() => {
              handleLike();
              handleColor();
            }}
            // size={35}
          >
            <div className={postStyles.likeCount}>{Likes}</div>
            <AiTwotoneLike
              className={`${postStyles.icons} ${postStyles.like}`}
              size={35}
            />
          </button>

          <button
            className={`${postStyles.icons} ${postStyles.comment}`}
            // size={28}
            onClick={handleComment}
          >
            <FaCommentAlt
              className={`${postStyles.icons} ${postStyles.comment}`}
              size={27}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
