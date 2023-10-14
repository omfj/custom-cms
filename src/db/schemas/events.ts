import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { companies, eventTypes, groups, locations } from ".";

export const events = sqliteTable("event", {
  slug: text("slug", { length: 20 }).primaryKey(),
  title: text("title", { length: 100 }).notNull(),
  body: text("body"),
  date: integer("date", { mode: "timestamp" }),
  registrationStart: integer("registration_start", { mode: "timestamp" }),
  registrationEnd: integer("registration_end", { mode: "timestamp" }),
  groupId: text("group_id", { length: 21 }).notNull(),
  eventTypeId: text("event_type_id", { length: 21 }).notNull(),
  companyId: text("company_id", { length: 21 }),
  locationId: text("location_id", { length: 21 }),
});

export const eventsRelations = relations(events, ({ one }) => ({
  eventType: one(eventTypes, {
    fields: [events.eventTypeId],
    references: [eventTypes.id],
  }),
  company: one(companies, {
    fields: [events.companyId],
    references: [companies.id],
  }),
  group: one(groups, {
    fields: [events.groupId],
    references: [groups.id],
  }),
  location: one(locations, {
    fields: [events.locationId],
    references: [locations.id],
  }),
}));

export type Event = typeof events.$inferSelect;
export type EventInsert = typeof events.$inferInsert;
