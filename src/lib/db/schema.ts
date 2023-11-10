import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  char,
  date,
  uuid,
  index,
} from "drizzle-orm/pg-core";
import { CONSTANTS } from "../constants";
import { sql } from "drizzle-orm";

export const users = pgTable(
  "users",
  {
    id: text("id").notNull().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    password: char("password", {
      length: CONSTANTS.ENCRYPTED_PASSWORD_LENGTH,
    }).notNull(),
    dob: date("dob", { mode: "string" }).notNull(),
    image: text("image"),
  },
  (users) => ({
    emailIdx: index("email_idx").on(users.email),
  })
);

export const locations = pgTable("locations", {
  id: uuid("id").defaultRandom().primaryKey(),
  address: text("address").notNull().unique(),
  registered_time: timestamp("registered_time", { mode: "string" })
    .defaultNow()
    .notNull(),
  description: text("description").notNull(),
});

export const posts = pgTable(
  "posts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    registered_time: timestamp("registered_time", { mode: "string" })
      .defaultNow()
      .notNull(),
    description: text("description").notNull(),
    trail_condition: integer("trail_condition").notNull(),
    weather: integer("weather").notNull(),
    accessibility: integer("accessibility").notNull(),
    picture_url: text("picture_url").notNull(),
    likes_count: integer("likes_count").notNull().default(0),
    location_id: uuid("location_id")
      .notNull()
      .references(() => locations.id, {
        onDelete: "cascade",
      }),
    owner_id: text("owner_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
  },
  (posts) => ({
    locationIdIdx: index("location_id_idx").on(posts.location_id),
    ownerIdIdx: index("owner_id_idx").on(posts.owner_id),
  })
);

export const comments = pgTable(
  "comments",
  {
    user_id: text("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    post_id: uuid("post_id").references(() => posts.id, {
      onDelete: "cascade",
    }),
    content: text("content").notNull(),
    registered_time: timestamp("registered_time", { mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (comments) => ({
    pk: primaryKey(comments.user_id, comments.post_id),
  })
);

export const usersToLocations = pgTable(
  "users_to_locations",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    locationId: uuid("location_id")
      .notNull()
      .references(() => locations.id, {
        onDelete: "cascade",
      }),
  },
  (usersToLocations) => ({
    pk: primaryKey(usersToLocations.userId, usersToLocations.locationId),
    userIdIdx: index("user_id_idx").on(usersToLocations.userId),
    locationIdIdx: index("location_id_idx").on(usersToLocations.locationId),
  })
);

export const usersLikePosts = pgTable("users_like_posts", {
  user_id: text("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  post_id: uuid("post_id").references(() => posts.id, {
    onDelete: "cascade",
  }),
});
