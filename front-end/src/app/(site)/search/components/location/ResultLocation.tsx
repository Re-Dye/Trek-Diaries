"use client"
import React from "react";
import loc from "./page.module.css";
import { HiLocationMarker } from "react-icons/hi";
import { IoInformationCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function ResultLocation({ id, address, description }: {
  id: string,
  address: string,
  description: string
}) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/location/${id}`)
  }

  return (
    <div className={loc.wrapper}>
      <div className={loc.content}>
        <div className={loc.header}>
          <HiLocationMarker size={30} />
          <a onClick={ handleClick }>{ address }</a>
        </div>

        <div className={loc.description}>
          <div className={loc.decLeft}>
            <IoInformationCircle size={20} color="grey" className={loc.icon} />
          </div>
          <div className={loc.decRight}>
            <p>
              { description }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
