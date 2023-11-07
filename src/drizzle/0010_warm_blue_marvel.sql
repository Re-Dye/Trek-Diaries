ALTER TABLE "posts" ALTER COLUMN "likes_count" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "location_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "owner_id" SET NOT NULL;