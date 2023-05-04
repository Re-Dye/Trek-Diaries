"use client"
import { AiTwotoneLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import postStyles from "../page.module.css";
import Image from "next/image";

export default function Post({address,name,likes,registeredTime,description,pictureURL }:{
    address: string,
    name: string,
    likes: number,
    registeredTime: Date,
    description: string,
    pictureURL: string
    }) {
    
        const storedDate = new Date(registeredTime);
        const now = new Date();
        const diff = now.getTime() - storedDate.getTime();
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        let formattedDiff;
        if(days>=1){
          formattedDiff = days + 'd ago';
        }
         else if (hours >= 1) {
          formattedDiff = hours + 'h ago';
        } else if (minutes >= 1) {
          formattedDiff = minutes + 'm ago';
        } else {
          formattedDiff = seconds + 's ago';
        }

    
    return(
       <div className= {postStyles.wrapper}>
        <div className={postStyles.leftCtn}>
            <Image
            alt="Error: Image could not be loaded."
            width = '1000'
            height = '500'
            src = {pictureURL}/>
        </div>
        <div className={postStyles.rightCtn}>
          <div className={postStyles.rTop}>
            <h3 className={postStyles.uName}>{name}</h3>
            <h5 className={postStyles.time}>{formattedDiff}</h5>
          </div>
          <div className={postStyles.rdesc}>
            <p className={postStyles.description}>
             {description}
            </p>
          </div>
  
          {/* <div className={postStyles.rRating}>
            <h3>*****</h3>
            <h3>**</h3>
          </div> */}
          <div className={postStyles.rReact}>
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

    )
}