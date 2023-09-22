import { db } from "@/lib/db/db";
import { credentialUsers, users, verificationTokens } from "@/lib/db/schema";
import { eq, sql, and } from "drizzle-orm";
import { redis } from "@/lib/db/upstash";

export const countUser = async (email: string) => {
  const countUser = db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(
      and(
        eq(users.email, sql.placeholder("email")),
        eq(users.type, "credential")
      )
    )
    .prepare("count_users");
  const result = await countUser.execute({ email });
  return result[0].count;
};

export const cacheUser = async ({
  uuid,
  email,
  password,
  name,
  dob,
  salt,
  token,
}: {
  uuid: string;
  email: string;
  password: string;
  name: string;
  dob: string;
  salt: string;
  token: string;
}) => {
  const res = await redis.set(
    uuid,
    JSON.stringify({ email, password, name, dob, salt, token }),
    { ex: 3600 }
  );

  if (res !== "OK") {
    console.error("Error in setting redis");
    throw new Error("Error in setting redis");
  }
};
