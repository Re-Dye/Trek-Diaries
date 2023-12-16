"use client";
import { useQuery } from "@tanstack/react-query";
import { Palmtree } from "lucide-react";

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
    <div className="flex-row absolute space-y-4 right-4 mt-8 box-border border rounded-2xl shadow-md p-6 h-4/5">
      <div className="flex gap-3">
        <h2 className="text-2xl">Recommendations</h2>
        <Palmtree className="w-7 h-7 text-green-500" />
      </div>
      <div className="overflow-y-auto h-4/5 space-y-3 ">
        {JSON.stringify(recommendedLocs)}
        {JSON.stringify(recommendedTrails)}
      </div>
    </div>
  );
}
