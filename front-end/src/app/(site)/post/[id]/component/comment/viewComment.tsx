import React from "react";
import comStyles from "./page.module.css"

const ViewComment = () => {
  return (
    <div className={comStyles.wrapper}>
      <div className={comStyles.userName}>
        <h3>Mandale don</h3>
      </div>
      <div className={comStyles.text}>
        <p>
          Parwa na gara yo duinya ko, timi mai baseko xa yo duniya mero Parwa na
          gara yo duinya ko, timi mai baseko xa yo duniya mero Parwa na gara yo
          duinya ko, timi mai baseko xa yo duniya mero
        </p>
      </div>
    </div>
  );
};

export default ViewComment;
