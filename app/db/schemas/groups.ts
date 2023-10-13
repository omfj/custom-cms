import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import { relations } from "drizzle-orm";
import { events, groupTypes, profilesToGroups } from ".";

export const groups = sqliteTable("group", {
  id: text("id", { length: 21 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name"),
  groupTypeId: text("group_type_id"),
});

export const groupsRelations = relations(groups, ({ one, many }) => ({
  profilesToGroups: many(profilesToGroups),
  events: many(events),
  type: one(groupTypes, {
    fields: [groups.groupTypeId],
    references: [groupTypes.id],
  }),
}));

export type Group = typeof groups.$inferSelect;
export type GroupInsert = typeof groups.$inferInsert;
