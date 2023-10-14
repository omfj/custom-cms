CREATE TABLE `companies` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`website` text
);
--> statement-breakpoint
CREATE TABLE `event_type` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `event` (
	`slug` text(20) PRIMARY KEY NOT NULL,
	`title` text(100) NOT NULL,
	`body` text,
	`date` integer,
	`registration_start` integer,
	`registration_end` integer,
	`group_id` text(21) NOT NULL,
	`event_type_id` text(21) NOT NULL,
	`company_id` text(21),
	`location_id` text(21)
);
--> statement-breakpoint
CREATE TABLE `group_type` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `group` (
	`id` text(21) PRIMARY KEY NOT NULL,
	`name` text,
	`group_type_id` text
);
--> statement-breakpoint
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
--> statement-breakpoint
CREATE TABLE `location` (
	`id` text(21) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`mazemap_url` text,
	`google_maps_url` text
);
--> statement-breakpoint
CREATE TABLE `post` (
	`id` text(21) PRIMARY KEY NOT NULL,
	`title` text(255) NOT NULL,
	`body` text NOT NULL,
	`published_by` text(21),
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `profile_to_group` (
	`profile_id` text(21) NOT NULL,
	`group_id` text(21) NOT NULL,
	PRIMARY KEY(`group_id`, `profile_id`)
);
--> statement-breakpoint
CREATE TABLE `profile` (
	`id` text(21) PRIMARY KEY NOT NULL,
	`name` text
);
