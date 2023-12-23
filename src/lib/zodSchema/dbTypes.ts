import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import {
  users,
  locations,
  posts,
  usersToLocations,
  comments,
  preferences,
} from "@/lib/db/schema";
import { TypeOf, z } from "zod";
import { Prettify } from "../prettify";
import { type } from "os";

export const selectUserSchema = createSelectSchema(users);
export const insertUserSchema = createInsertSchema(users);
export type InsertUser = z.infer<typeof insertUserSchema>;
export type ReturnUser = z.infer<typeof selectUserSchema>;

export const selectLocationSchema = createSelectSchema(locations);
export const insertLocationSchema = createInsertSchema(locations);
export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type ReturnLocation = z.infer<typeof selectLocationSchema>;

export const insertPostSchema = createInsertSchema(posts);

export const usersToLocationsSchema = createInsertSchema(usersToLocations);
export type UsersToLocations = z.infer<typeof usersToLocationsSchema>;
export type ReturnFollowedLocation = Prettify<
  UsersToLocations & { address: string }
>;

export const postSchema = createInsertSchema(posts);
export type InsertPost = z.infer<typeof postSchema>;
export const selectPostSchema = createSelectSchema(posts);
export type ReturnPost = Prettify<
  z.infer<typeof selectPostSchema> & {
    rating: number;
    location_address: string;
    owner_name: string;
  }
>;

export const selectCommentSchema = createSelectSchema(comments);
export const insertCommentSchema = createInsertSchema(comments);
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type ReturnComment = Prettify<
  z.infer<typeof selectCommentSchema> & {
    user_name: string;
  }
>;

export const insertPreferenceSchema = createInsertSchema(preferences);
export type InsertPreference = z.infer<typeof insertPreferenceSchema>;