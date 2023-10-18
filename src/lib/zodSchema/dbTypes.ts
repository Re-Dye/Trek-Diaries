import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users, locations, posts, usersToLocations } from "@/lib/db/schema";
import * as z from "zod";

export const selectUserSchema = createSelectSchema(users);
export const insertUserSchema = createInsertSchema(users);
export const selectLocationSchema = createSelectSchema(locations);
export const insertLocationSchema = createInsertSchema(locations);
export const insertPostSchema = createInsertSchema(posts);
export const insertUsersToLocationsSchema = createInsertSchema(usersToLocations);
export type InsertUser = z.infer<typeof insertUserSchema>
export type ReturnUser = z.infer<typeof selectUserSchema>
export type InsertLocation = z.infer<typeof insertLocationSchema>
export type ReturnLocation = z.infer<typeof selectLocationSchema>