import NavBar from "./components/NavBar/NavBar";
import Fbar from "./components/FollowedLocation/Fbar";
import React from "react";
// import PlacetoVisit from "./components/PlacetoVisit/PlaceVisit";

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
