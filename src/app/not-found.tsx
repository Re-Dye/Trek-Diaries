"use client"
import Image from 'next/image';

export default function NotFound() {
    return (
      <div className='flex justify-center items-center'>
        <div className='flex-row'>
        <h1 className='flex justify-center mt-8 text-9xl tracking-widest'>404</h1>
        <Image 
        width={500}
        height={400}
        src="/not_found.png"
        alt="Not Found"
        />
        <h1 className='flex justify-center mt-6 text-2xl tracking-wider'>Oops!! Page not found</h1>
        </div>
      </div>
    );
}