import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { events } from ".";

export const companies = sqliteTable("companies", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  website: text("website"),
});

export const companiesRelations = relations(companies, ({ many }) => ({
  events: many(events),
}));

export type Company = typeof companies.$inferSelect;
export type CompanyInsert = typeof companies.$inferInsert;
