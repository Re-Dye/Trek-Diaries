import "server-only";
import { db } from "@/lib/db/db";
import {
  users,
  locations,
  usersToLocations,
  posts,
  usersLikePosts,
  comments,
  preferences,
} from "@/lib/db/schema";
import { eq, sql, and, desc, asc, gt } from "drizzle-orm";
import { redis } from "@/lib/db/upstash";
import { cacheUserSchema, CachedUser } from "../zodSchema/cachedUser";
import {
  InsertLocation,
  UsersToLocations,
  ReturnLocation,
  ReturnUser,
  insertLocationSchema,
  ReturnFollowedLocation,
  InsertPost,
  ReturnPost,
  InsertComment,
  ReturnComment,
  insertCommentSchema,
  InsertPreference,
} from "@/lib/zodSchema/dbTypes";
import { LikePost } from "../zodSchema/likePost";
import { Pool } from "@neondatabase/serverless";
import { getDbUrl } from "../secrets";
import { drizzle } from "drizzle-orm/neon-serverless";

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

export const addComment = async (
  comment: InsertComment
) => {
  try {
    const addComment = db
      .insert(comments)
      .values({
        user_id: sql.placeholder("user_id"),
        content: sql.placeholder("content"),
        post_id: sql.placeholder("post_id"),
      })
      .returning()
      .prepare("add_location");
    const res = await addComment.execute({
      post_id: comment.post_id,
      content: comment.content,
      user_id: comment.user_id,
    });
    return res[0];
  } catch (error) {
    console.error("Error in adding comment: ", error);
    throw new Error("Error in adding comment: " + error);
  }
};

export const getComments = async (
  postId: string,
  limit: number,
  last: string | null
): Promise<{ comments: Array<ReturnComment>; next: string | undefined }> => {
  try {
    const getComments = db
      .select({
        id: comments.id,
        user_id: comments.user_id,
        post_id: comments.post_id,
        content: comments.content,
        registered_time: comments.registered_time,
        user_name: users.name,
      })
      .from(comments)
      .where(
        and(
          eq(comments.post_id, sql.placeholder("postId")),
          gt(comments.id, sql.placeholder("last"))
        )
      )
      .orderBy(desc(comments.registered_time), asc(comments.id))
      .limit(sql.placeholder("limit"))
      .innerJoin(users, eq(comments.user_id, users.id))
      .prepare("getComment");

    /* get one more post for next turn */
    const res = await getComments.execute({ postId, limit: limit + 1, last });

    /* if there is a next page */
    if (res.length === limit + 1) {
      const next: string = res[res.length - 1].id;
      res.pop();
      return { comments: res, next };
    } else {
      return { comments: res, next: undefined };
    }
  } catch (error) {
    console.error("Error in getting posts", error);
    throw new Error("Error in getting posts: " + error);
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
): Promise<Array<ReturnFollowedLocation>> => {
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

export const unfollowLocation = async (data: UsersToLocations) => {
  try {
    const { userId, locationId } = data;

    const unfollowLocation = db
      .delete(usersToLocations)
      .where(
        and(
          eq(usersToLocations.userId, sql.placeholder("userId")),
          eq(usersToLocations.locationId, sql.placeholder("locationId"))
        )
      )
      .prepare("unfollow_location");
    await unfollowLocation.execute({ userId, locationId });
  } catch (error) {
    console.error("Error in unfollowing location", error);
    throw new Error("Error in unfollowing location: " + error);
  }
};

export const addPost = async (data: InsertPost) => {
  try {
    const {
      accessibility,
      description,
      picture_url,
      trail_condition,
      weather,
      location_id,
      owner_id,
    } = data;
    const addPost = db
      .insert(posts)
      .values({
        accessibility: sql.placeholder("accessibility"),
        description: sql.placeholder("description"),
        picture_url: sql.placeholder("picture_url"),
        trail_condition: sql.placeholder("trail_condition"),
        weather: sql.placeholder("weather"),
        location_id: sql.placeholder("location_id"),
        owner_id: sql.placeholder("owner_id"),
      })
      .prepare("add_post");
    await addPost.execute({
      accessibility,
      description,
      picture_url,
      trail_condition,
      weather,
      location_id,
      owner_id,
    });
  } catch (error) {
    console.error("Error in adding post", error);
    throw new Error("Error in adding post: " + error);
  }
};

export const getPost = async (postId: string): Promise<ReturnPost> => {
  try {
    const getPost = db
      .select({
        id: posts.id,
        registered_time: posts.registered_time,
        description: posts.description,
        trail_condition: posts.trail_condition,
        weather: posts.weather,
        accessibility: posts.accessibility,
        rating: sql<number>`(${posts.accessibility} + ${posts.trail_condition} + ${posts.weather}) / 3`,
        picture_url: posts.picture_url,
        likes_count: posts.likes_count,
        location_id: posts.location_id,
        owner_id: posts.owner_id,
        location_address: locations.address,
        owner_name: users.name,
      })
      .from(posts)
      .where(eq(posts.id, sql.placeholder("postId")))
      .innerJoin(locations, eq(posts.location_id, locations.id))
      .innerJoin(users, eq(posts.owner_id, users.id))
      .prepare("get_post");
    const res = await getPost.execute({ postId });
    return res[0];
  } catch (error) {
    console.error("Error in getting post", error);
    throw new Error("Error in getting post: " + error);
  }
};

export const getPosts = async (
  locationId: string,
  limit: number,
  last: string | null
): Promise<{ posts: Array<ReturnPost>; next: string | undefined }> => {
  try {
    const getPosts = db
      .select({
        id: posts.id,
        registered_time: posts.registered_time,
        description: posts.description,
        trail_condition: posts.trail_condition,
        weather: posts.weather,
        accessibility: posts.accessibility,
        rating: sql<number>`(${posts.accessibility} + ${posts.trail_condition} + ${posts.weather}) / 3`,
        picture_url: posts.picture_url,
        likes_count: posts.likes_count,
        location_id: posts.location_id,
        owner_id: posts.owner_id,
        location_address: locations.address,
        owner_name: users.name,
      })
      .from(posts)
      .where(
        and(
          eq(posts.location_id, sql.placeholder("locationId")),
          gt(posts.id, sql.placeholder("last"))
        )
      )
      .orderBy(desc(posts.registered_time), asc(posts.id))
      .limit(sql.placeholder("limit"))
      .innerJoin(locations, eq(posts.location_id, locations.id))
      .innerJoin(users, eq(posts.owner_id, users.id))
      .prepare("get_posts");

    /* get one more post for next turn */
    const res = await getPosts.execute({ locationId, limit: limit + 1, last });

    /* if there is a next page */
    if (res.length === limit + 1) {
      const next: string = res[res.length - 1].id;
      res.pop();
      return { posts: res, next };
    } else {
      return { posts: res, next: undefined };
    }
  } catch (error) {
    console.error("Error in getting posts", error);
    throw new Error("Error in getting posts: " + error);
  }
};

export const getFeed = async (
  userId: string,
  limit: number,
  last: string | null
): Promise<{ posts: Array<ReturnPost>; next: string | undefined }> => {
  try {
    const sq = db
      .select({
        id: posts.id,
        registered_time: posts.registered_time,
        description: posts.description,
        trail_condition: posts.trail_condition,
        weather: posts.weather,
        accessibility: posts.accessibility,
        picture_url: posts.picture_url,
        likes_count: posts.likes_count,
        location_id: posts.location_id,
        owner_id: posts.owner_id,
      })
      .from(usersToLocations)
      .where(eq(usersToLocations.userId, sql.placeholder("userId")))
      .innerJoin(posts, eq(usersToLocations.locationId, posts.location_id))
      .as("sq");
    const getFeed = db
      .select({
        id: sq.id,
        registered_time: sq.registered_time,
        description: sq.description,
        trail_condition: sq.trail_condition,
        weather: sq.weather,
        accessibility: sq.accessibility,
        rating: sql<number>`(${sq.accessibility} + ${sq.trail_condition} + ${sq.weather}) / 3`,
        picture_url: sq.picture_url,
        likes_count: sq.likes_count,
        location_id: sq.location_id,
        owner_id: sq.owner_id,
        location_address: locations.address,
        owner_name: users.name,
      })
      .from(sq)
      .where(gt(sq.id, sql.placeholder("last")))
      .orderBy(desc(sq.registered_time), asc(sq.id))
      .limit(sql.placeholder("limit"))
      .innerJoin(locations, eq(sq.location_id, locations.id))
      .innerJoin(users, eq(sq.owner_id, users.id))
      .prepare("get_feed");

    /* get one more post for next turn */
    const res = await getFeed.execute({ userId, limit: limit + 1, last });

    /* if there is a next page */
    if (res.length === limit + 1) {
      const next: string = res[res.length - 1].id;
      res.pop();
      return { posts: res, next };
    } else {
      return { posts: res, next: undefined };
    }
  } catch (error) {
    console.error("Error in getting feed", error);
    throw new Error("Error in getting feed: " + error);
  }
};

export const postExists = async (postId: string) => {
  try {
    const postExists = db
      .select({ count: sql<number>`count(*)` })
      .from(posts)
      .where(eq(posts.id, sql.placeholder("postId")))
      .prepare("post_exists");
    const res = await postExists.execute({ postId });
    const count: number = res[0].count;
    if (count > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in checking if post exists", error);
    throw new Error("Error in checking if post exists: " + error);
  }
};

export const isPostLiked = async (data: LikePost): Promise<boolean> => {
  try {
    const isPostLiked = db
      .select({ count: sql<number>`count(*)` })
      .from(usersLikePosts)
      .where(
        and(
          eq(usersLikePosts.user_id, sql.placeholder("userId")),
          eq(usersLikePosts.post_id, sql.placeholder("postId"))
        )
      )
      .prepare("is_post_liked");
    const res = await isPostLiked.execute({
      userId: data.userId,
      postId: data.postId,
    });
    const count: number = res[0].count;
    if (count > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in checking if post is liked", error);
    throw new Error("Error in checking if post is liked: " + error);
  }
};

export const likePost = async (data: LikePost): Promise<number> => {
  const pool = new Pool({ connectionString: getDbUrl() });
  try {
    const db = drizzle(pool);
    const likePost = db.transaction(async (trx) => {
      await trx
        .insert(usersLikePosts)
        .values({
          user_id: data.userId,
          post_id: data.postId,
        })
        .execute();
      const res: { likes: number }[] = await trx
        .update(posts)
        .set({
          likes_count: sql<number>`${posts.likes_count} + 1`,
        })
        .where(eq(posts.id, data.postId))
        .returning({ likes: posts.likes_count })
        .execute();
      return res[0].likes;
    });
    const likes = await likePost;
    pool.end();
    return likes;
  } catch (error) {
    console.error("Error in liking post", error);
    pool.end();
    throw new Error("Error in liking post: " + error);
  }
};

export const dislikePost = async (data: LikePost) => {
  const pool = new Pool({ connectionString: getDbUrl() });
  try {
    const db = drizzle(pool);
    const dislikePost = db.transaction(async (trx) => {
      await trx
        .delete(usersLikePosts)
        .where(
          and(
            eq(usersLikePosts.user_id, data.userId),
            eq(usersLikePosts.post_id, data.postId)
          )
        )
        .execute();
      const res: { likes: number }[] = await trx
        .update(posts)
        .set({
          likes_count: sql<number>`${posts.likes_count} - 1`,
        })
        .where(eq(posts.id, data.postId))
        .returning({ likes: posts.likes_count })
        .execute();
      return res[0].likes;
    });
    const likes = await dislikePost;
    pool.end();
    return likes;
  } catch (error) {
    console.error("Error in liking post", error);
    pool.end();
    throw new Error("Error in liking post: " + error);
  }
};

export const addPreference = async (data: InsertPreference) => {
  try {
    const addPreference = db
      .insert(preferences)
      .values({
        user_id: sql.placeholder("user_id"),
        altitude: sql.placeholder("altitude"),
        distance: sql.placeholder("distance"),
        features: sql.placeholder("features"),
        month: sql.placeholder("month"),
        trail: sql.placeholder("trail"),
        type: sql.placeholder("type"),
      })
      .prepare("add_preference");
    await addPreference.execute({
      user_id: data.user_id,
      altitude: data.altitude,
      distance: data.distance,
      features: data.features,
      month: data.month,
      trail: data.trail,
      type: data.type,
    });
  } catch (error) {
    console.error("Error in adding preference", error);
    throw new Error("Error in adding preference: " + error);
  }
}