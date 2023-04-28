/* eslint-disable @next/next/no-head-element */

import NavBar from "./navBar/page";

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
