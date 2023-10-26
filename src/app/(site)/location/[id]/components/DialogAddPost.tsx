import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import RatingDropdown from "./RatingDropdown";
import { ImagePlus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddPostFormData, addPostFormSchema } from "@/lib/zodSchema/addPost";
import axios from "axios";

type Props = {
  locationID: string;
  open: boolean;
  handleOpen: (open: boolean) => void;
}

const DialogAddPost: FC<Props> = (props) => {
  const router = useRouter();
  const session = useSession({ required: true });
  const userId = session?.data?.user?.email;
  const form = useForm<AddPostFormData>({
    resolver: zodResolver(addPostFormSchema),
  }); 
  
  const [Description, setDescription] = useState("");
  const [TrailCondition, setTrialCondition] = useState<null | number>(0);
  const [Weather, setWeather] = useState<null | number>(0);
  const [Accessibility, setAccessibility] = useState<null | number>(0);
  const [imageSrc, setImageSrc] = useState<string>();
  const [uploadData, setUploadData] = useState();
  const [image_URL, setImageUrl] = useState("");
  const handleTrailConditon = (rating: number | null) => {
    console.log("TrailCondition:", rating);
    setTrialCondition(rating);
  };

  const handleWeather = (rating: number | null) => {
    console.log("Weather:", rating);
    setWeather(rating);
  };

  const handleAccessiblity = (rating: number | null) => {
    console.log("Accessibility: ", rating);
    setAccessibility(rating);
  };

  const handleImage = (
    changeEvent: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent: ProgressEvent<FileReader>): void {
      setImageSrc(onLoadEvent.target!.result as string);
      setUploadData(undefined);
    };
    reader.readAsDataURL(changeEvent.target.files![0]);
  };

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find((element: Element) => {
      return (element as HTMLInputElement).name === "file";
    }) as HTMLInputElement;

    const formData = new FormData();
    for (const file of Array.from(fileInput.files!)) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "Trek-Diaries");

    const data: { secure_url: string } = await fetch(
      "https://api.cloudinary.com/v1_1/dkid8h6ss/image/upload",
      {
        method: "POST",
        body: formData,
        cache: "no-store",
      }
    ).then((r) => r.json());
    console.log(data.secure_url);
    setImageUrl(data.secure_url);
  }

  /* handleCreatePost triggers an event which passes data to the add_post api */
  const handleCreatePost = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      //checking for Image from cloudinary......
      console.log(`checking URL from cloudinary....: ${image_URL}`);
      console.log(`checking user Mail....: ${userId}`);

      // setting overall Rating....
      const finalRating: number =
        ((Weather ?? 0) + (Accessibility ?? 0) + (TrailCondition ?? 0)) / 3;
      const overallScore: number = Math.round(finalRating * 100) / 100;

      console.log(
        Weather,
        Accessibility,
        TrailCondition,
        finalRating,
        overallScore
      );

      // calling restful API addpost
      const { data } = await axios.post("/api/add_post", {
        Description,
        locationID: props.locationID,
        image_URL,
        userId,
        TrailCondition,
        Weather,
        Accessibility,
        overallScore,
      });
      if (data) {
        console.log("Data has been sent successfully...");
        router.push(`/location/${props.locationID}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog onOpenChange={props.handleOpen} open={props.open}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Post</DialogTitle>
            </DialogHeader>
            <form
          onSubmit={handleSubmit}
          className="flex gap-4 justify-center items-center"
        >
          <div>
            <Input
              className="h-8"
              type="file"
              name="file"
              onChange={handleImage}
            />
          </div>
          <div className="flex-row space-y-2">
            <Button type="submit" className="gap-2 hover:bg-slate-500">
              {" "}
              Add Image <ImagePlus className="w-5 h-5" />
            </Button>
          </div>
        </form>
        <form className="flex-row justify-center items-center space-y-6">
          <Textarea
            name="text"
            id="description"
            placeholder="Description of the post (required...)"
            className="shadow-md border-2"
            value={Description}
            onChange={(e) => setDescription(e.target.value)} // setting value of Description
          />
          <div className="flex justify-between">
            <div className="space-y-1">
              <h3 className="text-sm">Trial Condition</h3>
              <RatingDropdown onRatingSelect={handleTrailConditon} />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm">Weather</h3>
              <RatingDropdown onRatingSelect={handleWeather} />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm">Accessibility</h3>
              <RatingDropdown onRatingSelect={handleAccessiblity} />
            </div>
          </div>
          <Button
            className=" hover:bg-slate-500 w-44"
            onClick={(e) => handleCreatePost(e)}
          >
            Create Post
          </Button>
        </form>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
  )
};

export default DialogAddPost;