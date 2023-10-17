ALTER TABLE "comments" ALTER COLUMN "registered_time" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "locations" ALTER COLUMN "registered_time" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "registered_time" SET DEFAULT now();--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "address_idx" ON "locations" ("address");