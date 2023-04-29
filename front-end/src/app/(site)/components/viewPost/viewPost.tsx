import postStyles from "./page.module.css";
import { AiTwotoneLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";

export default function ViewPost() {
  return (
    <div className={postStyles.wrapper}>
      <div className={postStyles.left}>
        <div className={postStyles.imgCtn}></div>
      </div>
      <div className={postStyles.right}>
        <div className={postStyles.rTop}>
          <h3 className={postStyles.uName}>Haridya Paradham</h3>
          <h5 className={postStyles.time}>12h</h5>
        </div>
        <div className={postStyles.rCenter}>
          <p className={postStyles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
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
