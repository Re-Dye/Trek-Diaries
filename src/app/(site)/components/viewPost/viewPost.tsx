import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Star from "../../post/[id]/component/star";
import { LocateFixed, MessageSquare, ThumbsUp, UserCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Owner {
  id: string;
  name: string;
}

interface Location {
  id: string;
  address: string;
}


//{id, location, description, likes, imageURL, owner}
export default function ViewPost({
  id,
  location,
  description,
  likes,
  imageURL,
  owner,
  rating,
}: {
  id: string;
  location: Location;
  description: string;
  likes: number;
  imageURL: string;
  owner: Owner;
  rating: number;
}) {
  const [Color, setColor] = useState("grey");
  const [Likes, setLike] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const email: any = session.data?.user?.email;
  // const handleColor = () => {
  //   if (isLiked) {
  //     setColor("blue");
  //     console.log("Liked")
  //   } else {
  //     setColor("grey");
  //   }
  // };

  const handleComment = () => {
    router.push(`/post/${id}`);
  };
  const handleLike = async () => {
    const encodedEmail = encodeURI(email);
    const eoncodedPostId = encodeURI(id);
    try {
      const res: Response = await fetch(
        `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/likePost?postId=${eoncodedPostId}&email=${encodedEmail}`,
        {
          method: "POST",
          cache: "no-store",
        }
      );
      if (isLiked) {
        setLike(likes);
      } else {
        setLike(likes + 1);
      }
      // setLike(isLiked ? likes : likes + 1); // Toggle between increment and decrement based on isLiked state
      setIsLiked(!isLiked); // Toggle the isLiked state
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="flex items-center justify-between rounded-2xl m-2 p-4 gap-10 shadow-md">
      <div className="flex-row space-y-4">
        <div className="text-sm flex gap-2">
          <LocateFixed className="w-4 h-4 text-red-500"/>
          <h3>{location.address}</h3>
        </div>
        <div className="relative w-64 h-72">
          <Image
            className="w-12 h-12 object-cover rounded-xl"
            alt="Error: Image could not be loaded."
            fill={true}
            src={imageURL}
          />
        </div>
      </div>
      <div className="flex-row space-y-6">
        <div className="text-lg flex justify-start gap-32">
          <div className="flex gap-2">
          <UserCircle className="mt-1"/>
          <h3>{owner?.name}</h3>
          </div>
          <div>
            <h5>12h</h5>
          </div>
        </div>
        <div className="box-border p-1 overflow-y-scroll">
          <p className="text-sm">{description}</p>
        </div>
        <div className="flex gap-2 text-md justify-end">
          <h5>Rating:  </h5>
          <Star stars={rating}/>
        </div>
        <div className="flex gap-8 justify-start">
          <button
            className="flex gap-2 cursor-pointer"
            onClick={() => {
              handleLike();
            }}
          >
            <div className="text-xl">{Likes}</div>
            <ThumbsUp className="w-6 h-6 hover:text-blue-600"/>
          </button>

          <button
            className="cursor-pointer"
            onClick={handleComment}
          >
            <MessageSquare className="w-6 h-6 hover:text-blue-600"/>
          </button>
        </div>
      </div>
    </Card>
  );
}
