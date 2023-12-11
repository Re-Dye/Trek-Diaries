import { MailCheck } from "lucide-react";
import { Metadata } from "next";
import { ModeToggle } from "@/app/(site)/components/DarkMode/Darkmode";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ButtonVerify from "./components/button";
import { countUserById, deleteCachedUser, findCachedUser, insertUser } from "@/lib/db/actions";
import { CachedUser } from "@/lib/zodSchema/cachedUser";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address",
};

const verifyEmail = async ({ id, token }: { id: string; token: string }): Promise<string> => {
  try {
    /* check if user exists */
    const count = await countUserById(id);
    console.log(count);
    if (count > 0) {
      const message =
        "It looks like you have already verified your email with us. Thank you!!";
      return message;
    }

    const user: CachedUser = await findCachedUser(token);

    /* check if ids match */
    if (user.uuid !== id) {
      const message = "Oops! Something went wrong. Please try again later";
      return message;
    }

    /* insert user in db */
    await insertUser(user);

    /* delete user from redis */
    await deleteCachedUser(token);

    const message = "Your email has been sucessfully verified. You can continue using the application.";
    return message;
  } catch (err) {
    const message = "Oops! Something went wrong. Please try again later";
    return message;
  }
};

export default async function UserVerifyPage({
  params,
}: {
  params: { id: string; token: string };
}) {
  const message = await verifyEmail({ id: params.id, token: params.token });

  return (
    <div className="relative rounded-xl m-4 z-10 sm:p-2 sm:w-full sm:m-2 md:m-3 lg:m-4 xl:m-6">
      <Card className="flex-row sm:p-2">
        <div className="flex absolute top-5 right-5 sm:top-7 sm:right-7 md:top-9 md:right-9">
          <ModeToggle />
        </div>
        <CardHeader className="flex justify-center items-center mt-6 sm:mt-6 md:mt-8">
          <CardTitle>
            <MailCheck className="w-8 h-8 text-lime-600 sm:w-12 sm:h-12 md:w-14 md:h-14" />
          </CardTitle>
          <CardDescription className="text-2xl text-center text-lime-600 sm:text-3xl">
            Email Verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className=" flex items-center rounded-md border p-4 sm:p-5 md:p-5">
            <div className="flex-1 space-y-4 sm:space-y-5">
              <h1 className="text-md font-medium leading-none sm:text-lg">
                {message}
              </h1>
              <p className=" text-sm text-muted-foreground sm:text-md md:text-lg">
                Click on continue button
              </p>
            </div>
          </div>
          <div></div>
        </CardContent>
        <CardFooter>
          <ButtonVerify />
        </CardFooter>
      </Card>
    </div>
  );
}
