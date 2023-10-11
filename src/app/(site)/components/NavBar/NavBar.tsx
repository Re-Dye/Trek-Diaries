"use client";
import React, { useEffect, useState } from "react";
import navStyles from "./navbar.module.css";
import SearchInput from "../SearchInput/SearchInput";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaHiking } from "react-icons/fa";
import ProfilePicture from "./components/profilePicture";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { LogOut, UserCircle } from "lucide-react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });
  const [name, setName] = useState("");

  useEffect(() => {
    if (session.status === "authenticated") {
      setName((session.data?.user?.name as string).slice(0, 1).toUpperCase());
    }
  }, [session]);

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/login" });
    router.push(data.url);
  };

  return (
    <div className={navStyles.wrapper}>
      <div className={navStyles.Bar}>
        <div className={navStyles.BarLeft}>
          <h1
            onClick={() => {
              router.push("/");
            }}
            className={navStyles.logo}
          >
            <FaHiking className={navStyles.icon} />D
          </h1>
        </div>
        <div>
          <SearchInput />
        </div>
        {/* <div className={navStyles.dp} onClick={() => setOpen((open) => !open)}>
          <ProfilePicture userFirst={name} />
        </div>
        {open && (
          <div className={navStyles.drop}>
            <ul>
              <li className={navStyles.dropdownItem}>
                <CgProfile />
                <>{(session.data?.user?.name as string)}</>
              </li>
              <li className={navStyles.dropdownItem} onClick={handleSignOut}>
                <FiLogOut />
                <a>Logout</a>
              </li>
            </ul>
          </div> */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-14 h-14 bg-transparent border-0 rounded-3xl flex relative justify-center items-center cursor-pointer"><ProfilePicture userFirst={name} /></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-2xl p-3">
              <DropdownMenuLabel className="flex justify-center text-md">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex gap-4">
                  <UserCircle />
                  <>{(session.data?.user?.name as string)}</>
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
  );
}
