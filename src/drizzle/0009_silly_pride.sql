CREATE TABLE IF NOT EXISTS "users_like_posts" (
	"user_id" text,
	"post_id" uuid
);
--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "trail_condition" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "weather" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "accessibility" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "location_id" uuid;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "owner_id" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_like_posts" ADD CONSTRAINT "users_like_posts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_like_posts" ADD CONSTRAINT "users_like_posts_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
