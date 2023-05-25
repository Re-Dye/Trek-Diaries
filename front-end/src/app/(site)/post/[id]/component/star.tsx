import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Star = ({ stars }: { stars: number }) => {
  const ratingStar = Array.from({ length: 5 }, (ignore, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar className="icon" color="#AA6C39" />
        ) : stars >= number ? (
          <FaStar className="icon" color="#AA6C39" />
        ) : (
          <AiOutlineStar className="icon" color="#AA6C39" />
        )}
      </span>
    );
  });

  return <div className="icon-style">{ratingStar}</div>;
};

export default Star;
