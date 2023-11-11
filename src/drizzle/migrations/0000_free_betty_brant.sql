CREATE TABLE `connection_types` (
	`connection_type_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`connection_type_name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `connections` (
	`connection_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`connection_type_id` integer NOT NULL,
	`connection_name` text NOT NULL,
	FOREIGN KEY (`connection_type_id`) REFERENCES `connection_types`(`connection_type_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `connection_types_uq_connection_type_name` ON `connection_types` (`connection_type_name`);--> statement-breakpoint
CREATE UNIQUE INDEX `connections_uq_connection_name` ON `connections` (`connection_name`);