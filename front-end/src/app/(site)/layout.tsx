/* eslint-disable @next/next/no-head-element */

import NavBar from "./components/NavBar/NavBar";

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
        { children }
      </main>
    </>
  );
}
