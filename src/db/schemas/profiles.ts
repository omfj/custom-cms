import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import { posts, profilesToGroups } from ".";

export const profiles = sqliteTable("profile", {
  id: text("id", { length: 21 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name"),
});

export const profilesRelations = relations(profiles, ({ many }) => ({
  posts: many(posts),
  profilesToGroups: many(profilesToGroups),
}));

export type Profile = typeof profiles.$inferSelect;
export type ProfileInsert = typeof profiles.$inferInsert;
