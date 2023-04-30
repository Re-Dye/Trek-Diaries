/* eslint-disable @next/next/no-head-element */

import NavBar from "./components/NavBar/NavBar";
import Fbar from "./components/FollowedBar/Fbar";
import Flocation from "./components/FollowedLocation/Flocation";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>
        <div className="navbar">
          <NavBar />
        </div>
        <div className="fbar">
          <Fbar />
        </div>
        <div className="flocation">
          <Flocation />
        </div>
        { children }
      </main>
    </>
  );
}
