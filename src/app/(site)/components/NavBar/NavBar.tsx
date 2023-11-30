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
import { LogOut, UserCircle } from "lucide-react";
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
    <nav className="w-full bg-slate-200 pr-8 pl-8 dark:bg-black fixed z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <div
          className="flex cursor-pointer "
          onClick={() => {
            router.push("/");
          }}>
          <FaHiking className="text-green-500 w-8 h-8" />
        </div>
        <div>
          <SearchInput />
        </div>
        <div className="flex gap-4">
          <div className="flex">
            <ModeToggle />
          </div>
          <div className="rounded-3xl flex cursor-pointer ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-10 h-10"><ProfilePicture userFirst={name} /></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-2xl p-3">
              <DropdownMenuLabel className="flex justify-center text-md">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem 
                  className="flex gap-4" 
                  onClick={()=>{
                    router.push('/MyProfile');
                  }}>
                  <UserCircle />
                  <>{(user?.name as string)}</>
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
