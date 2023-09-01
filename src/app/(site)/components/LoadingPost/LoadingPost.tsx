import React from "react";
import "./LoadingPost.css";

const LoadingPost = () => {
  return (
    <div className="wrapper skeleton">
      <div className="left">
        <div className="Tleft skeleton">
          <div className="skeleton skeleton-text"></div>
        </div>
        <div className="Bleft">
          <div className="imgCtn skeleton"></div>
        </div>
      </div>
      <div className="right">
        <div className="rTop skeleton">
          <div className="uName skeleton skeleton-text"></div>
          <div className="time skeleton skeleton-text"></div>
        </div>
        <div className="rCenter skeleton">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
        </div>
        <div className="rBottom skeleton "></div>
      </div>
    </div>
  );
};

export default LoadingPost;
