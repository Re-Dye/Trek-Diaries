import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users, locations, posts, usersToLocations } from "@/lib/db/schema";
import { z } from "zod";
import { Prettify } from "../prettify";

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
export type ReturnFollowedLocation = Prettify<UsersToLocations & { address: string }>;
