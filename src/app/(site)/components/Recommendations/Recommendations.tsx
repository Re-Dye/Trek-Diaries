"use client";
import { useQuery } from "@tanstack/react-query";
import { MapPinned, Palmtree, Pin, Route, TreePine } from "lucide-react";

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
      return data;
    },
  });
  return (
    <div className="flex-row w-[22%] fixed space-y-3 mt-4 right-5 lg:space-y-6 lg:mt-8 lg:right-5 rounded-md lg:rounded-2xl p-2 lg:p-8 shadow-md bg-slate-100 dark:bg-neutral-800">
      <div className="flex gap-1 lg:gap-2">
        <h2 className="text-[10px] sm:text-sm lg:text-2xl font-semibold">Recommendations</h2>
        <Palmtree className="w-3 h-3 sm:w-4 sm:h-4 lg:w-7 lg:h-7 text-green-500" />
      </div>
      <div className="flex-row gap-1 space-y-6 lg:gap-2 text-[8px] sm:text-xs lg:text-base">
        <div className="flex=row space-y-1">
          <div className="flex gap-3 items-center font-semibold text-cyan-600 dark:text-cyan-400">
            <Route className="w-2 h-2 lg:w-5 lg:h-5 flex" /><h2 className="text-[8px] sm:text-sm lg:text-xl"> Trails </h2>
          </div>
          <div>
            {recommendedTrails && Array.isArray(recommendedTrails) ? (
              recommendedTrails.map((trail, index) => (
                <ul key={index} className="flex items-center gap-2">
                  <Pin className="w-2 h-2 lg:w-3 lg:h-3" />{trail}
                </ul>
              ))
            ) : (
              <span>No recommended trails</span>
            )}
          </div>
        </div>
        <div className="flex=row space-y-1">
          <div className="flex gap-3 items-center font-semibold text-cyan-600 dark:text-cyan-400">
          <MapPinned className="w-2 h-2 lg:w-5 lg:h-5"/><h2 className="flex gap-2 text-[8px] sm:text-sm lg:text-xl"> Locations </h2>
            </div>
          <div>
          {recommendedLocs && Array.isArray(recommendedLocs) ? (
            recommendedLocs.map((location, index) => (
              <ul key={index} className="flex items-center gap-2">
                <Pin className="w-2 h-2 lg:w-3 lg:h-3" />
                {location}
              </ul>
            ))
          ) : (
            <span> No Recommended Locations</span>
          )}
          </div>
        </div>
      </div>
    </div>

  );
}
