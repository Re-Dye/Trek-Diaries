CREATE TABLE IF NOT EXISTS "credentialUser" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" char(32) NOT NULL,
	"dob" timestamp,
	"verified" boolean DEFAULT false NOT NULL
);
