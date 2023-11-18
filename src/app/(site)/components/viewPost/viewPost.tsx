import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import Star from "../../post/[id]/component/star";
import { LocateFixed, MessageSquare, ThumbsUp, UserCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import handleRegisteredTime from "@/lib/utilities/handleRegisteredTime";
import { LikePost } from "@/lib/zodSchema/likePost";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ReloadIcon } from "@radix-ui/react-icons";

interface Owner {
  id: string;
  name: string;
}

interface Location {
  id: string;
  address: string;
}

type Action = "like" | "dislike";

export default function ViewPost({
  id,
  location,
  registered_time,
  description,
  likes,
  imageURL,
  owner,
  rating,
}: {
  id: string;
  location: Location;
  registered_time: string;
  description: string;
  likes: number;
  imageURL: string;
  owner: Owner;
  rating: number;
}) {
  const [Likes, setLike] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();
  const session = useSession();

  const handleRouting = () => {
    router.push(`/post/${id}`);
  };

  const actionRef = useRef<Action>("like");

  const { status } = useQuery({
    queryKey: ["isLiked", id],
    queryFn: async () => {
      if (session.status === "authenticated") {
        try {
          const userId = session.data.user?.id;
          const res: Response = await fetch(`/api/post/like?userId=${userId}&postId=${id}`, {
            method: "GET"
          });
          const message = await res.json();
          
          if (res.status === 200) {
            const _data: { isLiked: boolean } = JSON.parse(message);
            setIsLiked(_data.isLiked);
            return;
          }
          
          if (res.status === 400) {
            toast({
              title: "Error",
              description: "Invalid request. Please try again later with valid data.",
              className:
                "fixed rounded-md top-0 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
            });
            return;
          }

          toast({
            title: "Error",
            description: "Error occured. Please try again later.",
            className:
              "fixed rounded-md top-0 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    enabled: (session.status === "authenticated")
  })
  
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      if (session.status === "authenticated") {
        const data: LikePost = {
          postId: id,
          userId: session.data.user?.id,
        };
  
        try {
          if (isLiked) {
            actionRef.current = "dislike";
            setLike((likes) => likes - 1);
            setIsLiked(false);
          } else {
            actionRef.current = "like";
            setLike((likes) => likes + 1);
            setIsLiked(true);
          }
          console.log(actionRef.current, isLiked)

          const res: Response = await fetch(
            `/api/post/${actionRef.current}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );
          const message = await res.json();
          const status = res.status;
          return { message, status };
        } catch (error) {
          console.log(error);
        }
      } else {
        toast({
          title: "Error",
          description: "Please login to like a post.",
          className:
            "fixed rounded-md top-0 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
        });
      }
    },
    onError: (error) => {
      console.log(error);
      if (actionRef.current == "dislike") {
        setLike((likes) => likes + 1);
        setIsLiked(true);
      } else {
        setLike((likes) => likes - 1);
        setIsLiked(false);
      }
    },
    onSuccess: (data) => {
      if (data === undefined) {
        return;
      }
      
      if (data.status === 201) {
        const _data:{likes: number} = JSON.parse(data.message);
        setLike(_data.likes);
        setIsLiked(() => actionRef.current === "like" ? true : false)
        return;
      }

      if (actionRef.current == "dislike") {
        setLike((likes) => likes + 1);
        setIsLiked(true);
      } else {
        setLike((likes) => likes - 1);
        setIsLiked(false);
      }

      if (data.status === 409) {
        toast({
          title: "Error",
          description: `Post already ${actionRef.current}d.`,
          className:
            "fixed rounded-md top-0 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
        });
        return;
      }
      
      if (data.status === 404) {
        toast({
          title: "Error",
          description: "Post not found. The post has been deleted or does not exist.",
          className:
            "fixed rounded-md top-0 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          });
          return;
      }

      if (data.status === 400) {
        toast({
          title: "Error",
          description: "Invalid request. Please try again later with valid data.",
          className:
            "fixed rounded-md top-0 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
        });
        return;
      }

      toast({
        title: "Error",
        description: "Error occured. Please try again later.",
        className:
        "fixed rounded-md top-0 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
      });
    }
  });

  const handleLike = () => {
    if (isPending) {
      toast({
        title: "Error",
        description: "Previous request is still pending. Please wait for it to complete.",
        className:
          "fixed rounded-md top-0 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
      });
    } else {
      mutate();
    }
  };

  return (
    <Card className="flex items-center justify-between rounded-2xl m-2 p-4 gap-10 shadow-md">
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
      <div className="flex-row space-y-6">
        <div className="text-lg flex justify-start gap-32">
          <div className="flex gap-2">
            <UserCircle className="mt-1" />
            <h3>{owner?.name}</h3>
          </div>
          <div>
            <h5>{handleRegisteredTime(registered_time)}</h5>
          </div>
        </div>
        <div className="box-border p-1 overflow-y-scroll">
          <p className="text-sm">{description}</p>
        </div>
        <div className="flex gap-2 text-md justify-end">
          <h5>Rating: </h5>
          <Star stars={rating} />
        </div>
        <div className="flex gap-8 justify-start">
          { status === "pending"? <ReloadIcon className="w-6 h-6 animate-spin" /> : 
            <button
            className="flex gap-2 cursor-pointer"
            onClick={handleLike}
            >
              <div className="text-xl">{Likes}</div>
              <ThumbsUp className={`w-6 h-6 ${isLiked? 'text-blue-600': 'text-gray-500'}`} />
            </button>
          }

          <button className="cursor-pointer" onClick={handleRouting}>
            <MessageSquare className="w-6 h-6 hover:text-blue-600" />
          </button>
        </div>
      </div>
    </Card>
  );
}
