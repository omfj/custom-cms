import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { groups } from ".";

export const groupTypes = sqliteTable("group_type", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});

export const groupTypesRelations = relations(groupTypes, ({ many }) => ({
  groups: many(groups),
}));

export type GroupType = typeof groupTypes.$inferSelect;
export type GroupTypeInsert = typeof groupTypes.$inferInsert;
