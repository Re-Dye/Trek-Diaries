import sendEmail from "@/lib/nodemailer";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "@/lib/zodSchema/signup";
import { ZodError } from "zod";
import { countUser, cacheUser } from "@/lib/db/actions";

export async function POST(req: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    /* check if request sent is valid */
    const { email, password, name, dob, salt } = signupSchema.parse(
      await req.json()
    );

    /* count users with same email */
    const count = await countUser(email);

    /* if email already exists */
    if (count > 0) {
      console.log("Duplicate Email!!!");
      return NextResponse.json(
        "Email already exists. Please try with another email.",
        { status: 409 }
      );
    }

    /* generate uuid for new user */
    const uuid = crypto.randomUUID();

    /* generate token */
    const token: string = crypto.randomBytes(32).toString("hex");

    /* insert user in cache for validation */
    await cacheUser({ uuid, email, password, name, dob, salt, token });

    const url: string = `${baseUrl}users/${uuid}/verify/${token}`;
    await sendEmail({ email, subject: "Verification Mail", link: url });

    // const insertUser = db
    //   .insert(users)
    //   .values({
    //     id: sql.placeholder("id"),
    //     name: sql.placeholder("name"),
    //     email: sql.placeholder("email"),
    //     type: "credential",
    //   }).prepare("insert_user");
    // await insertUser.execute({ id: uuid, name, email });
    // const insertCredential = db
    //   .insert(credentialUsers)
    //   .values({
    //     userId: sql.placeholder("userId"),
    //     password: sql.placeholder("password"),
    //     dob: sql.placeholder("dob"),
    //     salt: sql.placeholder("salt"),
    //   }).prepare("insert_credential");
    // await insertCredential.execute({ userId: uuid, password, dob, salt });

    return NextResponse.json("User Created", { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json("Invalid Request", { status: 400 });
    } else {
      console.log(error);
      return NextResponse.json("Internal Server Error", { status: 500 });
    }
  }
}
