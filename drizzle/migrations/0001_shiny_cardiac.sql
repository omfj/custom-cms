CREATE TABLE `job_type` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `job` (
	`slug` text PRIMARY KEY NOT NULL,
	`name` text(100) NOT NULL,
	`body` text,
	`application_url` text,
	`job_type_id` text NOT NULL,
	`company_id` text NOT NULL
);
