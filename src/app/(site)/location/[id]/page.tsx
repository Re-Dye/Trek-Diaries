import ButtonFollow from "./components/ButtonFollow";
import ButtonAddPost from "./components/ButtonAddPost";
import Posts from "./components/Posts";
import { notFound } from "next/navigation";
import { LocateFixed } from "lucide-react";
import { getLocation } from "@/lib/db/actions";
import { ReturnLocation } from "@/lib/zodSchema/dbTypes";

const fetchLocation = async (locationID: string): Promise<ReturnLocation|null>  => {
  try {
    const location: ReturnLocation = await getLocation(locationID);
    return location;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function LocationPage({
  params,
}: {
  params: { id: string };
}) {
  const locationID: string = params.id;
  const data = await fetchLocation(locationID);

  if (!data) {
    notFound()
  }

  return (
    <div className="flex justify-between h-full">
      <div className="w-1/4 bg-custom_gray mt-2 border"></div>
      <div className="mt-2 bg-custom_gray border w-2/4 box-border space-y-2">
        <div className="flex-row text-center p-4 m-2 rounded-xl shadow-md border-2 bg-transparent border-teal-600">
          <div className="text-lg space-y-4">
            <div className="flex gap-2 justify-center">
              <LocateFixed className="w-6 h-6 text-red-700" />
              <h1 className="text-xl">{data.address}</h1>
            </div>
            <p className="text-sm">{data.description}</p>
          </div>
          <div className="flex mt-5 justify-center gap-8">
            <ButtonAddPost locationID={locationID} />
            <ButtonFollow locationID={locationID} />
          </div>
        </div>
        <div>
          <Posts locationId={params.id} />
        </div>
      </div>
      <div className="w-1/5 bg-custom_gray border mt-2"></div>
    </div>
  );
}
