import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { companies, jobTypes } from ".";

export const jobs = sqliteTable("job", {
  slug: text("slug").primaryKey(),
  title: text("name", { length: 100 }).notNull(),
  body: text("body"),
  applicationUrl: text("application_url"),
  jobTypeId: text("job_type_id").notNull(),
  companyId: text("company_id").notNull(),
});

export const jobsRelations = relations(jobs, ({ one }) => ({
  jobType: one(jobTypes, {
    fields: [jobs.jobTypeId],
    references: [jobTypes.id],
  }),
  company: one(companies, {
    fields: [jobs.companyId],
    references: [companies.id],
  }),
}));

export type Job = typeof jobs.$inferSelect;
export type JobInsert = typeof jobs.$inferInsert;
