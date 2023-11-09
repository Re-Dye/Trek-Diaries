import Image from "next/image";
import { getBase64Url } from "@/lib/plaiceholder";
import { getBaseUrl } from "@/lib/secrets";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "TrekDiaries",
    template: "%s | TrekDiaries",
  },
  description: "Social media for trekkers and hikers",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const blurDataURL = await getBase64Url(`${getBaseUrl()}/ncpr.jpg`);
  return (
    <>
      <main>
        <div className="h-screen flex">
          <div className="relative w-3/4 sm:w-full border-0 shadow-black shadow-xl rounded-r-3xl">
            <Image
              className="object-cover w-full h-full"
              loading="eager"
              src="/ncpr.jpg"
              alt="backgroundImage"
              placeholder="blur"
              blurDataURL={blurDataURL}
              fill
            />
          </div>
          <div className="flex w-full md:w-3/4 lg:w-1/2 justify-center items-center">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
