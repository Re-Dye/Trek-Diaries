import sendEmail from "@/lib/nodemailer";
import Token from "../../../../lib/modals/Token";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "@/lib/zodSchema/signup";
import { db } from "@/lib/db/db";
import { credentialUsers, users, verificationTokens } from "@/lib/db/schema";
import { eq, sql, and } from "drizzle-orm";
import { generateUUID } from "@/lib/uuid";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    /* check if request sent is valid */
    const { email, password, name, dob, salt } = signupSchema.parse(
      await req.json()
    );
    console.log(email, password, name, dob, salt)

    /* count users with same email */
    const preparedCountUser = db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(
        and(
          eq(users.email, sql.placeholder("email")),
          eq(users.type, "credential")
        )
      )
      .prepare("count_users");
    const countUser = await preparedCountUser.execute({ email });
    console.log(countUser);

    /* if email already exists */
    if (countUser[0].count > 0) {
      console.log("Duplicate Email!!!");
      return NextResponse.json(
        "Email already exists. Please try with another email.",
        { status: 409 }
      );
    }

    /* generate uuid for new user */
    const uuid = generateUUID(email);

    await db
      .insert(users)
      .values({
        id: uuid,
        name,
        email,
        type: "credential",
      });
    await db
      .insert(credentialUsers)
      .values({
        userId: uuid,
        password,
        dob: new Date(dob),
        salt
      });

    /* generate token and store in database */
    // const token = crypto.randomBytes(32).toString("hex");
    // const pInsertToken = db
    //   .insert(verificationTokens)
    //   .values({
    //     identifier: sql.placeholder("identifier"),
    //     token: sql.placeholder("token"),
    //     expires: sql.placeholder("expires"),
    //   })
    //   .prepare("insert_token");
    // await pInsertToken.execute({ identifier: email, token, expires: Date.now() + 3600000 });
    // console.log("Token inserted");

    // const url: any = `${baseUrl}users/${uuid}/verify/${token}`;

    // console.log(`url: ${url}`);
    // await sendEmail(email, "Verification Mail", url);

    return NextResponse.json("User Created", { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json("Invalid Request", { status: 500 });
    }
  }
}
