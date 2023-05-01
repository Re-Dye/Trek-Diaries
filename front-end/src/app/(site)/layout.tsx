"use client"
import NavBar from "./components/NavBar/NavBar";
import Fbar from "./components/FollowedBar/Fbar";
import React, { useEffect, useState, createContext } from "react";
import { SessionContextValue, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const FLocationContext = createContext<Array<Location>>([])
export const ReloadFLocationContext = createContext<Function>(() => {})

export interface Location {
  _id: string;
  address: string;
}

const getFollowedLocations = async(email: string) => {
  const res = await fetch(
      `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/getFollowedLocations?email=${ email }`,
      { cache: 'no-store'}
  )
  return res.json()
}

function useFetchLocations(session: SessionContextValue): [
  locations: Location[],
  updateLocations: Function
] {
  const [locations, setLocations] = useState<Array<Location>>([])

  const updateLocations = async() => {
    const followedLocations = await getFollowedLocations(session?.data?.user?.email as string)
    setLocations(followedLocations)
  }

  useEffect(() => {
      if (session.status === "authenticated" && session.data.user) {
          const getData = async() => {
            await updateLocations()
          }
          getData()
      }
  }, [session])

  return [locations, updateLocations]
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()

  /* Sessions is used to extract email from the users... */
  const session = useSession({
    required: true,
    onUnauthenticated() {
        router.push("/login");
    },
  });

  const [locations, updateLocations] = useFetchLocations(session)

  return (
    <>
      <main>
        <div className="navbar">
          <NavBar />
        </div>
        <div className="fbar">
          <Fbar locations={ locations }/>
        </div>
        <FLocationContext.Provider value={ locations }>
          <ReloadFLocationContext.Provider value={ updateLocations }>
            { children }
          </ReloadFLocationContext.Provider>
        </FLocationContext.Provider>
      </main>
    </>
  );
}
