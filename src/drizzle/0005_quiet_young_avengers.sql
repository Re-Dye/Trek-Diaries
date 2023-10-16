CREATE TABLE IF NOT EXISTS "comments" (
	"user_id" text,
	"post_id" uuid,
	"content" text NOT NULL,
	"registered_time" timestamp NOT NULL,
	CONSTRAINT comments_user_id_post_id PRIMARY KEY("user_id","post_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "locations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"address" text NOT NULL,
	"registered_time" timestamp NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"registered_time" timestamp NOT NULL,
	"description" text NOT NULL,
	"picture_url" text NOT NULL,
	"likes_count" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_locations" (
	"user_id" text,
	"location_id" uuid,
	CONSTRAINT users_to_locations_user_id_location_id PRIMARY KEY("user_id","location_id")
);
--> statement-breakpoint
DROP TABLE "accounts";--> statement-breakpoint
DROP TABLE "credentialUsers";--> statement-breakpoint
DROP TABLE "sessions";--> statement-breakpoint
DROP TABLE "verificationTokens";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" char(60) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "salt" char(29) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "dob" date NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_idx" ON "users" ("email");--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "emailVerified";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "type";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_locations" ADD CONSTRAINT "users_to_locations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_locations" ADD CONSTRAINT "users_to_locations_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
