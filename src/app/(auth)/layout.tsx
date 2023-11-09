import Image from "next/image";
import { getBase64Url } from "@/lib/plaiceholder";
import { getBaseUrl } from "@/lib/secrets";
import { Suspense } from "react";

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
          <Suspense
            fallback={<div className="w-full h-full bg-gray-200"></div>}
          >
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
          </Suspense>
        </div>
      </main>
    </>
  );
}
