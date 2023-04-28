import React from "react";
import navStyles from "./page.module.css";
import SearchInput from "../components/SearchInput";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (dropRef.current) {
        {
          if (!dropRef.current.contains(e.target)) {
            setOpen(false);
            console.log(dropRef.current);
          }
        }
      }
    };

    document.addEventListener("mousedown", handler);
  });

  return (
    <div className={navStyles.wrapper}>
      <div className={navStyles.Bar}>
        <div className={navStyles.BarLeft}>
          <h1>Logo</h1>
        </div>
        <div className={navStyles.BarCenter}>
          <SearchInput />
        </div>
        <div className={navStyles.dp} ref={dropRef}>
          <div
            className={navStyles.trigger}
            onClick={() => {
              setOpen(!open);
            }}
          >
            <Image
              src="/ncpr.jpg"
              alt="profilePicture"
              width={50}
              height={50}
              object-Fit="contain"
            />
          </div>
          {open && (
            <div className={navStyles.drop}>
              <ul>
                <li className={navStyles.dropdownItem}>
                  <CgProfile />
                  <a>My profile</a>
                </li>
                <li className={navStyles.dropdownItem}>
                  <FiLogOut />
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
