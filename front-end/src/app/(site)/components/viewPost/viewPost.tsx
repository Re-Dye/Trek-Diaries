import postStyles from "./page.module.css";
import { AiTwotoneLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import Image from "next/image"
import { useRouter } from "next/navigation"

interface Owner {
  name: string,
}

//{id, location, description, likes, imageURL, owner}
export default function ViewPost({ id, location, description, likes, imageURL, owner }: {
  id: string,
  location: any,
  description: string,
  likes: number,
  imageURL: string,
  owner: Owner
}) {

  const router = useRouter();
  const handleComment = ()=>{
    router.push(`/post/${id}`);
  }

  return (
    <div className={postStyles.wrapper}>
      <div className={postStyles.left}>
        <h3>{location.address}</h3>
        <div className={postStyles.imgCtn}>
          <Image 
          alt="Error: Image could not be loaded."
          width = '1000'
          height = '500'
          src = {imageURL}/>
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
          {/* <AiTwotoneLike
            className={`${postStyles.icons} ${postStyles.like}`}
            size={35}
          /> */}
          <button
            className={`${postStyles.icons} ${postStyles.like}`}
            // size={35}
          > LIKE </button>
          {/* <FaCommentAlt
            className={`${postStyles.icons} ${postStyles.comment}`}
            size={28}
          /> */}
          <button
            className={`${postStyles.icons} ${postStyles.comment}`}
            // size={28}
            onClick = {handleComment}
          > COMMENT </button>
        </div>
      </div>
    </div>
  );
}
