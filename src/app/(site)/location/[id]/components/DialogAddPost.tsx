import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

import { ChangeEvent, ChangeEventHandler, FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddPostFormData, addPostFormSchema } from "@/lib/zodSchema/addPost";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Props = {
  locationID: string;
  open: boolean;
  handleOpen: (open: boolean) => void;
};

const DialogAddPost: FC<Props> = (props) => {
  const router = useRouter();
  const session = useSession({ required: true });
  const userId = session?.data?.user?.email;
  const form = useForm<AddPostFormData>({
    resolver: zodResolver(addPostFormSchema),
  });
  const [previewImageURL, setPreviewImageURL] = useState<string | null>(null);

  // async function handleSubmit(
  //   event: React.FormEvent<HTMLFormElement>
  // ): Promise<void> {
  //   event.preventDefault();

  //   const form = event.currentTarget;
  //   const fileInput = Array.from(form.elements).find((element: Element) => {
  //     return (element as HTMLInputElement).name === "file";
  //   }) as HTMLInputElement;

  //   const formData = new FormData();
  //   for (const file of Array.from(fileInput.files!)) {
  //     formData.append("file", file);
  //   }

  //   formData.append("upload_preset", "Trek-Diaries");

  //   const data: { secure_url: string } = await fetch(
  //     "https://api.cloudinary.com/v1_1/dkid8h6ss/image/upload",
  //     {
  //       method: "POST",
  //       body: formData,
  //       cache: "no-store",
  //     }
  //   ).then((r) => r.json());
  //   console.log(data.secure_url);
  //   setImageUrl(data.secure_url);
  // }

  /* handleCreatePost triggers an event which passes data to the add_post api */
  // const handleCreatePost = async (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   try {
  //     //checking for Image from cloudinary......
  //     console.log(`checking URL from cloudinary....: ${image_URL}`);
  //     console.log(`checking user Mail....: ${userId}`);

  //     // setting overall Rating....
  //     const finalRating: number =
  //       ((Weather ?? 0) + (Accessibility ?? 0) + (TrailCondition ?? 0)) / 3;
  //     const overallScore: number = Math.round(finalRating * 100) / 100;

  //     console.log(
  //       Weather,
  //       Accessibility,
  //       TrailCondition,
  //       finalRating,
  //       overallScore
  //     );

  //     // calling restful API addpost
  //     const { data } = await axios.post("/api/add_post", {
  //       Description,
  //       locationID: props.locationID,
  //       image_URL,
  //       userId,
  //       TrailCondition,
  //       Weather,
  //       Accessibility,
  //       overallScore,
  //     });
  //     if (data) {
  //       console.log("Data has been sent successfully...");
  //       router.push(`/location/${props.locationID}`);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleImage: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      form.setValue("image", event.target.files[0]);
      setPreviewImageURL(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onAddPost: SubmitHandler<AddPostFormData> = async (data) => {
    console.log(data);
  };

  return (
    <Dialog onOpenChange={props.handleOpen} open={props.open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Post</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onAddPost)}>
            <div className="flex space-x-3 my-3">
              {form.formState.errors.image && (
                <p className="text-red-600 font-medium">
                  {form.formState.errors.image.message}
                </p>
              )}
              <Label>Select picture to upload</Label>

              <Input
                // {...field}
                className="h-8"
                type="file"
                accept=".jpeg, .png, .jpg, .webp"
                onChange={handleImage}
              />
              {previewImageURL && (
                <>
                  <Image
                    src={previewImageURL}
                    alt="preview"
                    width={300}
                    height={300}
                  />
                </>
              )}
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      name="text"
                      placeholder="Description of the post (required...)"
                      className="shadow-md border-2 my-5"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="trial_condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trial Condition</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">★ (Poor)</SelectItem>
                        <SelectItem value="2">★★ (Average)</SelectItem>
                        <SelectItem value="3">★★★ (Good)</SelectItem>
                        <SelectItem value="4">★★★★ (Outstanding)</SelectItem>
                        <SelectItem value="5">★★★★★ (Excellent)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weather"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weather</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">★ (Poor)</SelectItem>
                        <SelectItem value="2">★★ (Average)</SelectItem>
                        <SelectItem value="3">★★★ (Good)</SelectItem>
                        <SelectItem value="4">★★★★ (Outstanding)</SelectItem>
                        <SelectItem value="5">★★★★★ (Excellent)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accessibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accessibility</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">★ (Poor)</SelectItem>
                        <SelectItem value="2">★★ (Average)</SelectItem>
                        <SelectItem value="3">★★★ (Good)</SelectItem>
                        <SelectItem value="4">★★★★ (Outstanding)</SelectItem>
                        <SelectItem value="5">★★★★★ (Excellent)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className=" hover:bg-slate-500 w-44" type="submit">
              Create Post
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddPost;
