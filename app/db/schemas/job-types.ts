import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { jobs } from "./jobs";

export const jobTypes = sqliteTable("job_type", {
  id: text("id").primaryKey(),
  name: text("name"),
});

export const jobTypesRelations = relations(jobTypes, ({ many }) => ({
  jobs: many(jobs),
}));

export type JobType = typeof jobTypes.$inferSelect;
export type JobTypeInsert = typeof jobTypes.$inferInsert;
