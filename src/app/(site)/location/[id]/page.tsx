import { notFound } from "next/navigation";
import { getLocation } from "@/lib/db/actions";
import { ReturnLocation } from "@/lib/zodSchema/dbTypes";
import LocationWrapper from "./components/LocationWrapper";

const fetchLocation = async (
  locationID: string
): Promise<ReturnLocation | null> => {
  try {
    const location: ReturnLocation = await getLocation(locationID);
    return location;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default async function LocationPage({
  params,
}: {
  params: { id: string };
}) {
  const locationID: string = params.id;
  const data = await fetchLocation(locationID);

  if (!data) {
    notFound();
  }

  return (
    <div className="flex justify-between h-full">
      <div className="w-1/4 bg-custom_gray mt-2 border"></div>
       <LocationWrapper location={data as ReturnLocation} />
      <div className="w-1/5 bg-custom_gray border mt-2"></div>
    </div>
  );
}
