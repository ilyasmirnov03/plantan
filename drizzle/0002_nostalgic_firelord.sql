CREATE TABLE "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vacation" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "variant" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"start_date" date,
	"end_date" date,
	"vacation_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "variant_step" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"spending" real,
	"category_id" integer NOT NULL,
	"variant_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "vacation" ADD CONSTRAINT "vacation_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "neon_auth"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variant" ADD CONSTRAINT "variant_vacation_id_vacation_id_fk" FOREIGN KEY ("vacation_id") REFERENCES "public"."vacation"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variant_step" ADD CONSTRAINT "variant_step_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variant_step" ADD CONSTRAINT "variant_step_variant_id_variant_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."variant"("id") ON DELETE no action ON UPDATE no action;
