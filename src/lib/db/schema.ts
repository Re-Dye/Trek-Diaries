import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  uuid,
  char,
  boolean
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import { CONSTANTS } from "../constants";

type UserType = "credential" | "google";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  type: text("type").$type<UserType>().notNull().default("google"),
});

export const credentialUsers = pgTable( "credentialUser", {
  userId: text("id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  password: char("password", { length: CONSTANTS.ENCRYPTED_PASSWORD_LENGTH }).notNull(),
  salt: char("salt", { length: CONSTANTS.SALT_LENGTH }).notNull(),
  dob: timestamp("dob", { mode: "date" }).notNull(),
  verified: boolean("verified").notNull().default(false),
});

export const userRelation = relations(users, ({ one }) => ({
  credentialUsers: one(credentialUsers, {
    fields: [users.id],
    references: [credentialUsers.userId],
  }),
}));

export const accounts = pgTable(
  "account",
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

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);
