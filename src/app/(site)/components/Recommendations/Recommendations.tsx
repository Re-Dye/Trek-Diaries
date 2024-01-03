"use client";
import { useQuery } from "@tanstack/react-query";
import { Palmtree, TreePine } from "lucide-react";
import { useEffect } from "react";

export default function Recommendations({ userId }: { userId: string }) {
  const { data: recommendedLocs } = useQuery({
    queryKey: ["locsRecommendations", userId],
    queryFn: async () => {
      const res = await fetch(
        `/api/flask/locs_recommendation?userId=${userId}`,
        { cache: "no-cache" }
      );
      const data = await res.json();
      return data;
    },
  });
  const { data: recommendedTrails } = useQuery({
    queryKey: ["trailRecommendations", userId],
    queryFn: async () => {
      const res = await fetch(
        `/api/flask/trail_recommendation?userId=${userId}`,
        { cache: "no-cache" }
      );
      const data = await res.json();
      console.log(data)
      return data;
    },
  });
  return (
<div className="flex-row w-[22%] absolute space-y-3 mt-4 right-5 lg:space-y-6 lg:mt-8 lg:right-5 rounded-md lg:rounded-2xl p-2 lg:p-8 shadow-md bg-slate-100 dark:bg-neutral-800">
      <div className="flex gap-1 lg:gap-2">
        <h2 className="text-[10px] sm:text-sm lg:text-2xl">Recommendations</h2>
        <Palmtree className="w-3 h-3 sm:w-4 sm:h-4 lg:w-7 lg:h-7 text-green-500" />
      </div>
        <div className="flex gap-1 lg:gap-2 text-[8px] sm:text-xs lg:text-base">
        <TreePine />
        <div>
            <h2 className="text-[8px] sm:text-sm lg:text-2xl"> Trails </h2>
            {recommendedTrails && Array.isArray(recommendedTrails) ? (
              recommendedTrails.map((trail, index) => (
                <li key={index}>
                  {trail}
                </li>
              ))
            ) : (
              <span>No recommended trails</span>
            )}
          <div>
            <h2 className="text-[8px] sm:text-sm lg:text-2xl"> Locations </h2>
              {recommendedLocs && Array.isArray(recommendedLocs)?(
                recommendedLocs.map((location, index) => (
                  <li key = {index}>
                    {location}
                  </li>
                ))
              ):(
                <span> No Recommended Locations</span>
              )}
          </div>  
        </div>
      </div>
    </div>
  );
}
