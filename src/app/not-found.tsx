import { getBase64Url } from "@/lib/plaiceholder";
import { getBaseUrl } from "@/lib/secrets";
import Image from "next/image";

export default async function NotFound() {
  const blurDataURL = await getBase64Url(`${getBaseUrl()}/not_found.png`);
  return (
    <div className="flex justify-center items-center">
      <div className="flex-row">
        <h1 className="flex justify-center mt-8 text-9xl tracking-widest">
          404
        </h1>
        <Image
          width={500}
          height={400}
          src="/not_found.png"
          alt="Not Found"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
        <h1 className="flex justify-center mt-6 text-2xl tracking-wider">
          Oops!! Page not found
        </h1>
      </div>
    </div>
  );
}
