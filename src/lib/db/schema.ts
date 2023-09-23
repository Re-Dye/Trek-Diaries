import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  char,
  boolean,
  date
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import { CONSTANTS } from "../constants";

type UserType = "credential" | "google";

export const users = pgTable("users", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  type: text("type").$type<UserType>().notNull().default("google"),
});

export const credentialUsers = pgTable("credentialUsers", {
  userId: text("userId")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  password: char("password", { length: CONSTANTS.ENCRYPTED_PASSWORD_LENGTH }).notNull(),
  salt: char("salt", { length: CONSTANTS.SALT_LENGTH }).notNull(),
  dob: date("dob", { mode: "string" }).notNull(),
});

export const userRelation = relations(users, ({ one }) => ({
  belongsTo: one(credentialUsers, {
    fields: [users.id],
    references: [credentialUsers.userId],
  }),
}));

export const accounts = pgTable(
  "accounts",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const sessions = pgTable("sessions", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationTokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);
