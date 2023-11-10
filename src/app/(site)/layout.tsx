import NavBar from "./components/NavBar/NavBar";
import Fbar from "./components/FollowedLocation/Fbar";
import React from "react";
// import PlacetoVisit from "./components/PlacetoVisit/PlaceVisit";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "TrekDiaries",
    template: "%s | TrekDiaries",
  },
  description: "Social media for trekkers and hikers",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>
          <div className="navbar">
            <NavBar />
          </div>
          <div className="fbar">
            <Fbar />
          </div>
          <div className="rbar">{/* <PlacetoVisit /> */}</div>
          {children}
      </main>
    </>
  );
}
