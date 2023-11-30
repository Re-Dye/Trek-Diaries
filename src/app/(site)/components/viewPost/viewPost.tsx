import Image from "next/image";
import { useRouter } from "next/navigation";
import Star from "../../post/[id]/component/star";
import { LocateFixed, UserCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import handleRegisteredTime from "@/lib/utilities/handleRegisteredTime";
import dynamic from "next/dynamic";

const ButtonLike = dynamic(() => import("./ButtonLike"), { ssr: false });
const ButtonComment = dynamic(() => import("./ButtonComment"), { ssr: false });

interface Owner {
  id: string;
  name: string;
}

interface Location {
  id: string;
  address: string;
}

export default function ViewPost({
  userId,
  id,
  location,
  registered_time,
  description,
  likes,
  imageURL,
  owner,
  rating,
}: {
  userId: string | undefined;
  id: string;
  location: Location;
  registered_time: string;
  description: string;
  likes: number;
  imageURL: string;
  owner: Owner;
  rating: number;
}) {
  const router = useRouter();

  const handleRouting = () => {
    router.push(`/post/${id}`);
  };

  return (
    <Card className="flex justify-evenly items-center rounded-2xl m-2 p-4 gap-10 shadow-md">
      <div className="flex-row space-y-4">
        <div className="text-sm flex gap-2">
          <LocateFixed className="w-4 h-4 text-red-500" />
          <h3>{location.address}</h3>
        </div>
        <div className="relative w-64 h-72">
          <Image
            className="w-12 h-12 object-cover rounded-xl"
            alt="Error: Image could not be loaded."
            fill={true}
            src={imageURL}
            onClick={handleRouting}
          />
        </div>
      </div>
      <div className="flex-row space-y-10">
        <div className="flex">
          <div className="text-md flex gap-24">
            <div className="flex gap-2">
              <UserCircle />
              <h3>{owner?.name}</h3>
            </div>
            <div className="text-sm">
              <h5>{handleRegisteredTime(registered_time)}</h5>
            </div>
          </div>
        </div>
        <div className="box-border p-1 overflow-y-scroll">
          <p className="text-sm">{description}</p>
        </div>
        <div className="flex gap-2 text-md justify-end">
          <h5>Rating: </h5>
          <Star stars={rating} />
        </div>
        {/* if user logged in show like and comment button */}
        {userId && (
          <div className="flex gap-8 justify-start">
            <ButtonLike postId={id} userId={userId} likes={likes}/>
            <ButtonComment handleRouting={handleRouting} />
          </div>
        )}
      </div>
    </Card>
  );
}
