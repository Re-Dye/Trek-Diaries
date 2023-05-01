import postStyles from "./page.module.css";
import { AiTwotoneLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import Image from "next/image"

//{id, location, description, likes, imageURL, owner}
export default function ViewPost({id,location,description,likes,imageURL,owner}) {
  return (
    <div className={postStyles.wrapper}>
      <div className={postStyles.left}>
        <div className={postStyles.imgCtn}>
          <Image 
          width = '1000'
          height = '500'
          src = {imageURL}/>
        </div>
      </div>
      <div className={postStyles.right}>
        <div className={postStyles.rTop}>
          <h3 className={postStyles.uName}>{owner.name}</h3>
          <h5 className={postStyles.time}>12h</h5>
        </div>
        <div className={postStyles.rCenter}>
          <p className={postStyles.description}>
            Here is the description of the place: <br />
            {description}
          </p>
        </div>
        <div className={postStyles.rBottom}>
          <AiTwotoneLike
            className={`${postStyles.icons} ${postStyles.like}`}
            size={35}
          />
          <FaCommentAlt
            className={`${postStyles.icons} ${postStyles.comment}`}
            size={28}
          />
        </div>
      </div>
    </div>
  );
}
