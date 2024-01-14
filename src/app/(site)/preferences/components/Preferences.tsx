import { Focus } from "lucide-react";
import FormPreferences from "./FormPreferences";
import { getPreference } from "@/lib/db/actions";
import { ReturnPreference } from "@/lib/zodSchema/dbTypes";
import { Suspense } from "react";

export default async function Preferences({ userId }: { userId: string }) {
  const preference: ReturnPreference | null = await getPreference(userId);

  return (
    <div className=" space-y-4">
      <div className="flex justify-center gap-3">
        <h1 className=" text-xl tracking-wider font-semibold">
          My Preferences
        </h1>
        <Focus className="text-teal-300" />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <FormPreferences userId={userId} preference={preference} />
      </Suspense>
    </div>
  );
}