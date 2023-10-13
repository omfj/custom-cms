import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import { events } from ".";

export const locations = sqliteTable("location", {
  id: text("id", { length: 21 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  mazemapUrl: text("mazemap_url"),
  googleMapsUrl: text("google_maps_url"),
});

export const locationsRelations = relations(locations, ({ many }) => ({
  events: many(events),
}));

export type Location = typeof locations.$inferSelect;
export type LocationInsert = typeof locations.$inferInsert;
