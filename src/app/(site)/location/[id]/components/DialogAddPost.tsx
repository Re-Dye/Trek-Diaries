import { Input } from "@/components/ui/input";
import { Button, ButtonLoading } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

import { ChangeEventHandler, FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddPostFormData,
  AddPostRequestData,
  addPostFormSchema,
} from "@/lib/zodSchema/addPost";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCloudinaryApiKey,
  getCloudinaryFolderName,
  getCloudinaryName,
} from "@/lib/secrets";
import { signImage, signature, Signature } from "@/lib/zodSchema/signImage";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  locationID: string;
  open: boolean;
  handleOpen: (open: boolean) => void;
  userId: string;
};

const DialogAddPost: FC<Props> = (props) => {
  const {toast} = useToast();
  const form = useForm<AddPostFormData>({
    resolver: zodResolver(addPostFormSchema),
  });
  const client = useQueryClient();

  const [previewImageURL, setPreviewImageURL] = useState<string | null>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: AddPostFormData) => {
      let sign: string = "";
      let timestamp: number = 0;
      let imageUrl: string = "";

      /* get signature of image to upload */
      try {
        const req = signImage.parse({
          size: data.image.size,
          type: data.image.type,
        });
        const res = await fetch("/api/sign_image", {
          cache: "no-store",
          method: "POST",
          body: JSON.stringify(req),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const message: string = await res.json();
        const status: number = res.status;

        if (status === 201) {
          const temp: Signature = signature.parse(JSON.parse(message));
          sign = temp.signature;
          timestamp = temp.timestamp;
        } else if (status === 400) {
          toast({
            className: "fixed rounded-md top-2 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
            title: "Invalid Request",
            description: "Please try again later with proper information."
          })
          return;
        } else {
          toast({
            variant: "destructive",
            className: "fixed rounded-md top-2 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
            description: "Error occured while signing image. Please try again later.",
          })
          return;
        }
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          className: "fixed rounded-md top-2 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          description: "Error occured while signing image. Please try again later.",
        })
        return;
      }

      /* upload image to cloudinary */
      try {
        const cloudinaryName = getCloudinaryName();
        const cloudinaryApiKey = getCloudinaryApiKey();
        const formData = new FormData();
        formData.append("file", data.image);
        formData.append("signature", sign);
        formData.append("timestamp", timestamp.toString());
        formData.append("api_key", cloudinaryApiKey);
        formData.append("folder", getCloudinaryFolderName());
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
          {
            cache: "no-store",
            method: "POST",
            body: formData,
          }
        );
        const { secure_url } = await res.json();
        imageUrl = secure_url;
        console.log(imageUrl);
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          className: "fixed rounded-md top-2 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          description: "Error occured while uploading image. Please try again later.",
        })
        return;
      }

      const req: AddPostRequestData = {
        description: data.description,
        accessibility: +data.accessibility,
        image_url: imageUrl,
        location_id: props.locationID,
        trail_condition: +data.trail_condition,
        weather: +data.weather,
        owner_id: props.userId,
      };

      const res = await fetch("/api/location/post", {
        cache: "no-store",
        method: "POST",
        body: JSON.stringify(req),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const message: string = await res.json();
      const status: number = res.status;
      return { message, status };
    },
    onSuccess: (data) => {
      if (data === undefined) {
        toast({
          variant: "destructive",
          className: "fixed rounded-md top-2 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          description: "Error occured while adding post. Please try again later.",
        })
        return;
      }

      if (data.status === 201) {
        toast({
          className: "fixed rounded-md top-2 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          description: "Post added successfully.",
        })
        client.invalidateQueries({ queryKey: ["posts", props.locationID] });
        props.handleOpen(false);
        form.reset();
      } else if (data.status === 400) {
        toast({
          className: "fixed rounded-md top-2 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          title: "Invalid Request",
          description: "Please try again later with proper information."
        })
      } else {
        toast({
          variant: "destructive",
          className: "fixed rounded-md top-2 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          description: "Error occured while adding post. Please try again later.",
        })
      }
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: "destructive",
        className: "fixed rounded-md top-2 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
        description: "Error occured while adding post. Please try again later.",
      })
    },
  });

  const handleImage: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      form.setValue("image", event.target.files[0]);
      setPreviewImageURL(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onAddPost: SubmitHandler<AddPostFormData> = (data) => mutate(data);

  return (
    <Dialog onOpenChange={props.handleOpen} open={props.open}>
      <DialogContent className="bg-zinc-200 dark:bg-black space-y-4">
        <DialogHeader>
          <DialogTitle className="text-2xl m-auto flex justify-center align-center tracking-wider text-teal-600 ">
            ADD POST
          </DialogTitle>
        </DialogHeader>
        <div className="flex">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onAddPost)}>
              <div className="flex-row space-x-3 items-center justify-center">
                {form.formState.errors.image && (
                  <p className="text-red-600 font-medium">
                    {form.formState.errors.image.message}
                  </p>
                )}
                <div>
                  <Label>Select picture to upload</Label>

                  <Input
                    // {...field}
                    className="h-8"
                    type="file"
                    accept=".jpeg, .png, .jpg, .webp"
                    onChange={handleImage}
                  />
                </div>
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
                name="trail_condition"
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
              <div className="m-4">
                {isPending ? (
                  <ButtonLoading className=" btn mt-3 px-3 py-2 transition ease-in-out delay-100 text-xs text-white rounded-md w-full bg-cyan-600 lg:h-8 xl:h-10 " />
                ) : (
                  <Button
                    className=" hover:bg-slate-500 w-44 m-auto flex align-center justify-center"
                    type="submit"
                  >
                    Create Post
                  </Button>
                )}
              </div>
            </form>
          </Form>

          <div className="m-4 w-60 h-fit border-2 border-sky-500 ">
            {previewImageURL === null && (
              <>
                <div className="flex justify-center items-center h-60">
                  <p className="text-gray-500 text-xl">No image selected</p>
                </div>
              </>
            )}
            {previewImageURL && (
              <>
                <Image
                  src={previewImageURL}
                  width={240}
                  height={240}
                  alt="preview"
                  // layout="fill"
                  objectFit="cover"
                />
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddPost;
