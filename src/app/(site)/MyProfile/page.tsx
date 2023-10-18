import { Metadata } from "next";
import MyProfile from "./components/Myprofile";

export const metadata: Metadata = {
  title: 'MyProfile | TrekDiaries',
  description: 'User Profile page of TrekDiaries',
}

export default function UserProfilePage() {
  return (
    <div className="flex justify-between min-h-screen">
      <div className="w-1/4 bg-custom_gray mt-2 border"></div>
      <div className="mt-2 bg-custom_gray border w-2/4 box-border space-y-2">
        <div className="flex-row text-center p-4 m-2 rounded-xl shadow-md border-2 bg-transparent border-teal-600">
          <MyProfile />
        </div>
      </div>
      <div className="w-1/5 bg-custom_gray border mt-2"></div>
    </div>
  );
}