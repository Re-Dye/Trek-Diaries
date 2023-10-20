import Image from "next/image";
import { getBase64Url } from "@/lib/plaiceholder";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const blurDataURL = await getBase64Url(`${process.env.NEXT_PUBLIC_BASE_URL}/ncpr.jpg`);
    return (
    <>
      <main>
        <div className="h-screen flex flex-row sm:flex-row md:flex-row lg:flex-row xl:flex-row ">
          <div className="relative w-full sm:h-full md:h-full lg:h-full xl:h-full  border-0 shadow-black shadow-xl rounded-r-3xl">
            <Image
              className="object-cover w-full h-full"
              loading="lazy"
              src="/ncpr.jpg"
              alt="backgroundImage"
              placeholder="blur"
              blurDataURL={ blurDataURL }
              fill
            />
          </div>
          { children }
        </div>
      </main>
    </>
  );
}
