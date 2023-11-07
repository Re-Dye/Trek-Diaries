DROP INDEX IF EXISTS "address_idx";--> statement-breakpoint
ALTER TABLE "users_to_locations" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users_to_locations" ALTER COLUMN "location_id" SET NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "users_to_locations" ("user_id");--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_address_unique" UNIQUE("address");