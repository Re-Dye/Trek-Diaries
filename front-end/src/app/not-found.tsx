"use client"
import Image from 'next/image';

export default function NotFound() {
  const imageStyle = {
    display:"flex",
    justifyContent:"center",
    marginTop:"20%"

  };
    return (
      <div style={imageStyle}>
        <Image 
        src="/not_found.png"
        width={500}
        height={403.44}
        alt="Not Found"
        />
      </div>
    );
}