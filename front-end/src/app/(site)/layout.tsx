"use client"
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
        { children }
      </main>
    </>
  );
}
