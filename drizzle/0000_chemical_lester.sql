CREATE TABLE IF NOT EXISTS "authors" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(255),
	"birth_date" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255),
	"author_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "libraries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"address" varchar(1023)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "library_to_books" (
	"book_id" integer NOT NULL,
	"author_id" integer NOT NULL,
	CONSTRAINT library_to_books_book_id_author_id PRIMARY KEY("book_id","author_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "books" ADD CONSTRAINT "books_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "library_to_books" ADD CONSTRAINT "library_to_books_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "library_to_books" ADD CONSTRAINT "library_to_books_author_id_libraries_id_fk" FOREIGN KEY ("author_id") REFERENCES "libraries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
