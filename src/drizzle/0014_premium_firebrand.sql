ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_post_id";--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "post_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "id" uuid DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "comments" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_id_idx" ON "comments" ("post_id");