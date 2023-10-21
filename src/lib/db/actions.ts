import { db } from "@/lib/db/db";
import { users, locations, usersToLocations } from "@/lib/db/schema";
import { eq, sql, and } from "drizzle-orm";
import { redis } from "@/lib/db/upstash";
import { cacheUserSchema, CachedUser } from "../zodSchema/cachedUser";
import {
  InsertLocation,
  UsersToLocations,
  ReturnLocation,
  ReturnUser,
  insertLocationSchema,
} from "@/lib/zodSchema/dbTypes";

export const countUserByEmail = async (email: string) => {
  try {
    const countUser = db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(eq(users.email, sql.placeholder("email")))
      .prepare("count_users");
    const result = await countUser.execute({ email });
    return result[0].count;
  } catch (error) {
    console.error("Error in counting users: ", error);
    throw new Error("Error in counting users: " + error);
  }
};

export const countUserById = async (id: string) => {
  try {
    const countUser = db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(eq(users.id, sql.placeholder("id")))
      .prepare("count_users");
    const result = await countUser.execute({ id });
    return result[0].count;
  } catch (error) {
    console.error("Error in counting users: ", error);
    throw new Error("Error in counting users: " + error);
  }
};

export const cacheUser = async ({
  uuid,
  email,
  password,
  name,
  dob,
  token,
}: {
  uuid: string;
  email: string;
  password: string;
  name: string;
  dob: string;
  token: string;
}) => {
  const res = await redis.set(
    token,
    JSON.stringify({ email, password, name, dob, uuid }),
    { ex: 3600 }
  );

  if (res !== "OK") {
    console.error("Error in setting redis");
    throw new Error("Error in setting redis");
  }
};

export const findCachedUser = async (token: string) => {
  try {
    const user: CachedUser = cacheUserSchema.parse(await redis.get(token));
    return user;
  } catch (error) {
    console.error("Error in finding cached user: ", error);
    throw new Error("Error in finding cached user: " + error);
  }
};

export const deleteCachedUser = async (token: string) => {
  try {
    const res = await redis.del(token);
    if (res !== 1) {
      console.error("Error in deleting cache");
      throw new Error("Error in deleting cache");
    }
  } catch (error) {
    console.error("Error in deleting cache: ", error);
    throw new Error("Error in deleting cache: " + error);
  }
};

export const insertUser = async (user: CachedUser) => {
  try {
    const { uuid, email, password, name, dob } = user;
    const insertUser = db
      .insert(users)
      .values({
        id: sql.placeholder("id"),
        name: sql.placeholder("name"),
        email: sql.placeholder("email"),
        password: sql.placeholder("password"),
        dob: sql.placeholder("dob"),
      })
      .prepare("insert_user");
    await insertUser.execute({ id: uuid, name, email, password, dob });
  } catch (error) {
    console.error("Error in inserting user: ", error);
    throw new Error("Error in inserting user: " + error);
  }
};

export const findUser = async (email: string): Promise<ReturnUser> => {
  try {
    const findUser = db
      .select()
      .from(users)
      .where(eq(users.email, sql.placeholder("email")))
      .prepare("find_user");
    const result = await findUser.execute({ email });
    return result[0];
  } catch (error) {
    console.error("Error in finding user: ", error);
    throw new Error("Error in finding user: " + error);
  }
};

export const countLocationByAddress = async (address: string) => {
  try {
    const countLocation = db
      .select({ count: sql<number>`count(*)` })
      .from(locations)
      .where(eq(locations.address, sql.placeholder("address")))
      .prepare("count_location");
    const result = await countLocation.execute({ address });
    return result[0].count;
  } catch (error) {
    console.error("Error in counting locations: ", error);
    throw new Error("Error in counting locations: " + error);
  }
};

export const addLocation = async (
  location: InsertLocation
): Promise<ReturnLocation> => {
  try {
    const { address, description } = insertLocationSchema.parse(location);
    const addLocation = db
      .insert(locations)
      .values({
        address: sql.placeholder("address"),
        description: sql.placeholder("description"),
      })
      .returning()
      .prepare("add_location");
    const res = await addLocation.execute({ address, description });
    return res[0];
  } catch (error) {
    console.error("Error in adding location: ", error);
    throw new Error("Error in adding location: " + error);
  }
};

export const getLocation = async (id: string): Promise<ReturnLocation> => {
  try {
    const getLocation = db
      .select()
      .from(locations)
      .where(eq(locations.id, sql.placeholder("id")))
      .prepare("get_location");
    const res = await getLocation.execute({ id });
    return res[0];
  } catch (error) {
    console.error("Error in getting location: ", error);
    throw new Error("Error in getting location: " + error);
  }
};

export const checkFollowLocation = async (data: UsersToLocations) => {
  try {
    const { userId, locationId } = data;

    const checkFollowLocation = db
      .select({ count: sql<number>`count(*)` })
      .from(usersToLocations)
      .where(
        and(
          eq(usersToLocations.userId, sql.placeholder("userId")),
          eq(usersToLocations.locationId, sql.placeholder("locationId"))
        )
      )
      .prepare("check_follow_location");
    const res = await checkFollowLocation.execute({ userId, locationId });
    const count: number = res[0].count;
    if (count > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(
      `Error in checking if user:${data.userId} has followed location:${data.locationId}: ${error}`
    );
    throw new Error("Error in checking follow location: " + error);
  }
};

export const followLocation = async (data: UsersToLocations) => {
  try {
    const { userId, locationId } = data;

    const followLocation = db
      .insert(usersToLocations)
      .values({
        userId: sql.placeholder("userId"),
        locationId: sql.placeholder("locationId"),
      })
      .prepare("follow_location");
    await followLocation.execute({ userId, locationId });
  } catch (error) {
    console.error("Error in following location", error);
    throw new Error("Error in following location: " + error);
  }
};

export const getFollowedLocations = async (
  userId: string
): Promise<Array<UsersToLocations & { address: string }>> => {
  try {
    const getFollowedLocations = db
      .select({
        userId: usersToLocations.userId,
        locationId: usersToLocations.locationId,
        address: locations.address,
      })
      .from(usersToLocations)
      .where(eq(usersToLocations.userId, sql.placeholder("userId")))
      .innerJoin(locations, eq(usersToLocations.locationId, locations.id))
      .prepare("get_followed_locations");

    const res2 = await getFollowedLocations.execute({ userId });
    return res2;
  } catch (error) {
    console.error("Error in getting followed locations: ", error);
    throw new Error(`Error in getting followed locations: ${error}`);
  }
};
