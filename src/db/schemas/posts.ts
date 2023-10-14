import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import { profiles } from "./profiles";

export const posts = sqliteTable("post", {
  slug: text("id", { length: 21 })
    .primaryKey()
    .$defaultFn(() => nanoid(21)),
  title: text("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  publishedBy: text("published_by", { length: 21 }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const postsRelations = relations(posts, ({ one }) => ({
  publishedBy: one(profiles, {
    fields: [posts.publishedBy],
    references: [profiles.id],
  }),
}));

export type Post = typeof posts.$inferSelect;
export type PostInsert = typeof posts.$inferInsert;
