"use client";
import React, { useEffect, useState } from "react";
import SearchInput from "../SearchInput/SearchInput";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaHiking } from "react-icons/fa";
import ProfilePicture from "./components/profilePicture";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LifeBuoy, LogOut, Mountain, UserCircle } from "lucide-react";
import { ModeToggle } from "../DarkMode/Darkmode";

export default function NavBar({ user }: { user: any }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name.slice(0, 1).toUpperCase());
    } else {
      setName("");
    }
  });

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/login" });
    router.push(data.url);
  };

  return (
    <nav className="w-full bg-slate-200 pr-2 pl-2 sm:pr-4 sm:pl-4 md:pr-6 md:pl-6 lg:pr-8 lg:pl-8 dark:bg-black fixed z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <div
          className="flex cursor-pointer text-green-600 font-bold text-[21px] sm:text-3xl"
          onClick={() => {
            router.push("/");
          }}>
          <FaHiking className="text-green-600 w-6 h-6 sm:w-8 sm:h-8" />D
        </div>
        <div>
          <SearchInput />
        </div>
        <div className="flex gap-1 sm:gap-2 md:gap-4">
          <div className="flex cursor-pointer">
            <ModeToggle />
          </div>
          <div className="rounded-3xl flex cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-8 h-8 sm:w-10 sm:h-10"><ProfilePicture userFirst={name} /></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-2xl p-3">
              <DropdownMenuLabel className="flex justify-center text-md">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem 
                  className="flex gap-4 cursor-pointer" 
                  onClick={()=>{
                    router.push('/MyProfile');
                  }}>
                  <UserCircle />
                  <>{(user?.name as string)}</>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="flex gap-4 cursor-pointer" 
                  onClick={()=>{
                    router.push('/preferences');
                  }}>
                  <LifeBuoy className=" text-teal-600"/>Preferences
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="flex gap-4">
                <LogOut />Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        </div>
      </div>
    </nav>
  );
}
