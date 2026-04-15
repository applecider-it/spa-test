ALTER TABLE "admin_users" ALTER COLUMN "email" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "admin_users" ADD CONSTRAINT "admin_users_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");