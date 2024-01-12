import { Metadata } from "next";
import MyProfile from "./components/Myprofile";

export const metadata: Metadata = {
  title: 'MyProfile | TrekDiaries',
  description: 'User Profile page of TrekDiaries',
}

export default function UserProfilePage() {
  return (
    <div className="flex gap-1 sm:gap-4 sm:justify-between min-h-screen mt-14 dark:bg-black bg-slate-100">
      <div className="w-2/5 sm:w-1/4 bg-custom_gray mt-2 border"></div>
      <div className="mt-2 bg-custom_gray border w-3/4 sm:w-2/4 box-border">
        <div className="flex-row mt-10 text-center p-4 m-2 rounded-xl shadow-md border-2 bg-transparent border-teal-600">
          <MyProfile />
        </div>
      </div>
      <div className="w-2/5 sm:w-1/4 bg-custom_gray border mt-2"></div>
    </div>
  );
}