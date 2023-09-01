import React from "react";
import comStyles from "./page.module.css"

const ViewComment = ({content, owner, registeredTime}: {
  content: string,
  owner: string,
  registeredTime: Date
}) => {
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
  return (
    <div className={comStyles.wrapper}>
      <div>
        <h5>{formattedDiff}</h5>
      </div>
      <div className={comStyles.userName}>
        <h3>{owner}</h3>
      </div>
      <div className={comStyles.text}>
        <p>
          {content}
        </p>
      </div>
    </div>
  );
};

export default ViewComment;
