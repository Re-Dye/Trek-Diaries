import React from "react";
import loc from "./page.module.css";
import { HiLocationMarker } from "react-icons/hi";
import { IoInformationCircle } from "react-icons/io5";

export default function Location() {
  return (
    <div className={loc.wrapper}>
      <div className={loc.content}>
        <div className={loc.header}>
          <HiLocationMarker size={30} />
          <h2>Location Name</h2>
        </div>

        <div className={loc.description}>
          <div className={loc.decLeft}>
            <IoInformationCircle size={20} color="grey" className={loc.icon} />
          </div>
          <div className={loc.decRight}>
            <p>
              Kathmandu, Nepal's capital, is set in a valley surrounded by the
              Himalayan mountains. At the heart of the old city’s mazelike
              alleys is Durbar Square, which becomes frenetic during Indra
              Jatra, a religious festival featuring masked dances. Many of the
              city's historic sites were damaged or destroyed by a 2015
              earthquake. Durbar Square's palace, Hanuman Dhoka, and
              Kasthamandap, a wooden Hindu temple, are being rebuilt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
