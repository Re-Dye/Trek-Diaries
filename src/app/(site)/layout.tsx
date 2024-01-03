import NavBar from "./components/NavBar/NavBar";
import Fbar from "./components/FollowedLocation/Fbar";
import React from "react";
// import PlacetoVisit from "./components/PlacetoVisit/PlaceVisit";
import { Metadata } from "next";
import { getCurrentUser } from "@/lib/session";
import dynamic from "next/dynamic";

const Recommendations = dynamic(
  () => import("./components/Recommendations/Recommendations"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: {
    default: "TrekDiaries",
    template: "%s | TrekDiaries",
  },
  description: "Social media for trekkers and hikers",
};

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <>
      <main>
        <div className="navbar">
          <NavBar user={user} />
        </div>
        <div className="fbar">
          <Fbar user={user} />
        </div>
        {/* <div className="rbar">{user && <Recommendations userId={user.id} />}</div> */}
        {children}
      </main>
    </>
  );
}
