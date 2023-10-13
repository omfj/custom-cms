import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { profiles, groups } from ".";

export const profilesToGroups = sqliteTable(
  "profile_to_group",
  {
    profileId: text("profile_id", { length: 21 }).notNull(),
    groupId: text("group_id", { length: 21 }).notNull(),
  },
  (t) => ({
    pk: primaryKey(t.profileId, t.groupId),
  })
);

export const profilesGroupsMembershipRelations = relations(
  profilesToGroups,
  ({ one }) => ({
    profile: one(profiles, {
      fields: [profilesToGroups.profileId],
      references: [profiles.id],
    }),
    group: one(groups, {
      fields: [profilesToGroups.groupId],
      references: [groups.id],
    }),
  })
);

export type ProfileToGroup = typeof profilesToGroups.$inferSelect;
export type ProfileToGroupInsert = typeof profilesToGroups.$inferInsert;
