import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { events } from ".";
import { relations } from "drizzle-orm";

export const eventTypes = sqliteTable("event_type", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});

export const eventTypesRelations = relations(eventTypes, ({ many }) => ({
  events: many(events),
}));

export type EventType = typeof eventTypes.$inferSelect;
export type EventTypeInsert = typeof eventTypes.$inferInsert;
