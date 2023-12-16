import { Metadata } from "next";
import Preferences from "./components/Preferences";

export const metadata: Metadata = {
  title: 'Preferences | TrekDiaries',
  description: 'Preference page of TrekDiaries',
}

export default function UserPreferencePage() {
  return (
    <div className="flex justify-between min-h-screen mt-14 dark:bg-black bg-slate-100">
      <div className="w-1/4 bg-custom_gray mt-2 border"></div>
      <div className="mt-2 bg-custom_gray border w-2/4 box-border space-y-2">
        <div className="flex-row text-center p-4 m-2 rounded-xl shadow-md border-2 bg-transparent border-teal-600">
          <Preferences />
        </div>
      </div>
      <div className="w-1/5 bg-custom_gray border mt-2"></div>
    </div>
  );
}