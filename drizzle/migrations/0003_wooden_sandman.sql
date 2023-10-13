CREATE TABLE `location` (
	`id` text(21) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`mazemap_url` text,
	`google_maps_url` text
);
--> statement-breakpoint
ALTER TABLE event ADD `location_id` text(21);