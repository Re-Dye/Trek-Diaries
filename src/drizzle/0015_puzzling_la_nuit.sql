DO $$ BEGIN
 CREATE TYPE "month" AS ENUM('jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'nov', 'dec');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('easy', 'moderate', 'challenging');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "preferences" (
	"user_id" text PRIMARY KEY NOT NULL,
	"type" "type" NOT NULL,
	"trail" text NOT NULL,
	"distance" integer NOT NULL,
	"altitude" integer NOT NULL,
	"month" "month" NOT NULL,
	"features" json NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "preferences" ADD CONSTRAINT "preferences_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
