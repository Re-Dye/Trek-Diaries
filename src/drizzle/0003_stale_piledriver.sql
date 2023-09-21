ALTER TABLE "credentialUser" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "credentialUser" ALTER COLUMN "password" SET DATA TYPE char(60);--> statement-breakpoint
ALTER TABLE "credentialUser" ALTER COLUMN "dob" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "credentialUser" ADD COLUMN "salt" char(29) NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "type" text DEFAULT 'google' NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "credentialUser" ADD CONSTRAINT "credentialUser_id_user_id_fk" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "credentialUser" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "credentialUser" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "dob";