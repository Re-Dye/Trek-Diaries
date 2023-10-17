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
import { relations } from "drizzle-orm";
import { CONSTANTS } from "../constants";

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

export const userRelations = relations(users, ({ many }) => ({
  usersToLocations: many(usersToLocations),
}));

export const locations = pgTable(
  "locations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    address: text("address").notNull(),
    registered_time: timestamp("registered_time", { mode: "string" }).defaultNow().notNull(),
    description: text("description").notNull(),
  },
  (locations) => ({
    addressIdx: index("address_idx").on(locations.address),
  })
);

export const locationRelations = relations(locations, ({ many }) => ({
  usersToLocations: many(usersToLocations),
}));

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  registered_time: timestamp("registered_time", { mode: "string" }).defaultNow().notNull(),
  description: text("description").notNull(),
  picture_url: text("picture_url").notNull(),
  likes_count: integer("likes_count").notNull(),
});

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
    registered_time: timestamp("registered_time", { mode: "string" }).defaultNow().notNull(),
  },
  (comments) => ({
    pk: primaryKey(comments.user_id, comments.post_id),
  })
);

export const usersToLocations = pgTable(
  "users_to_locations",
  {
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    locationId: uuid("location_id").references(() => locations.id, {
      onDelete: "cascade",
    }),
  },
  (usersToLocations) => ({
    pk: primaryKey(usersToLocations.userId, usersToLocations.locationId),
  })
);

export const usersToLocationsRelations = relations(
  usersToLocations,
  ({ one }) => ({
    location: one(locations, {
      fields: [usersToLocations.locationId],
      references: [locations.id],
    }),
    user: one(users, {
      fields: [usersToLocations.userId],
      references: [users.id],
    }),
  })
);
