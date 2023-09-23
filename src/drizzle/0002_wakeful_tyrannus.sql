ALTER TABLE "credentialUsers" DROP CONSTRAINT "credentialUsers_userId_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "credentialUsers" ADD CONSTRAINT "credentialUsers_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
