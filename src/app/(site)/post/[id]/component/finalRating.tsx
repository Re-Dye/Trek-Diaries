import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";

const FinalRating = ({ stars }: { stars: number }) => {
  const score = (100 / 5) * stars;

  const calcColor = (percent: number, start: number, end: number) => {
    let a = percent / 100,
      b = (end - start) * a,
      c = b + start;

    return "hsl(" + c + ", 100%, 50%)";
  };
  return (
    <div className="flex w-16 h-16 justify-center items-center">
    <CircularProgressbar
      value={score}
      text={`${stars}`}
      circleRatio={1}
      styles={{
        root: {},
        trail: {
          stroke: "grey",
          strokeLinecap: "round",
          transform: 'rotate(0.25turn)',
          transformOrigin: "center center",
        },
        path: {
          strokeLinecap: "round",
          transform: 'rotate(0.25turn)',
          transformOrigin: "center center",
          stroke: calcColor(score,0,60),
        },
        text: {
          fill: 'chocolate',
          // Text size
          fontSize: '36px',
          transform: "translate(-9px, 10px)",
        },
      }}
      strokeWidth={10}
    />
  </div>
  );
};

export default FinalRating;
