import { notFound } from "next/navigation";
import { getLocation } from "@/lib/db/actions";
import { ReturnLocation } from "@/lib/zodSchema/dbTypes";
import LocationWrapper from "./components/LocationWrapper";
import { getCurrentUser } from "@/lib/session";

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
  const [data, user] = await Promise.all([fetchLocation(locationID), getCurrentUser()]);

  if (!data) {
    notFound();
  }

  return (
    <div className="flex gap-1 sm:gap-4 sm:justify-between min-h-screen mt-14 dark:bg-black bg-slate-100">
      <div className="w-2/5 sm:w-1/4 bg-custom_gray mt-2 border"></div>
      <div className="mt-2 bg-custom_gray border w-3/4 sm:w-2/4 box-border">
        <LocationWrapper location={data as ReturnLocation} userId={ user?.id }/>
       </div>
      <div className="w-2/5 sm:w-1/4 bg-custom_gray border mt-2"></div>
    </div>
  );
}
