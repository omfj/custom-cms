"use server";

import { db } from "@/db/drizzle";
import {
  CompanyInsert,
  EventInsert,
  JobInsert,
  PostInsert,
  ProfileInsert,
  companies,
  events,
  jobs,
  posts,
  profiles,
} from "@/db/schemas";
import { slugify } from "@/lib/slugify";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type CreateItemProps =
  | {
      type: "events";
      item: EventInsert;
    }
  | {
      type: "posts";
      item: PostInsert;
    }
  | {
      type: "profiles";
      item: ProfileInsert;
    }
  | {
      type: "jobs";
      item: JobInsert;
    }
  | {
      type: "companies";
      item: Omit<CompanyInsert, "id">;
    };

export async function createItem({ type, item }: CreateItemProps) {
  if (type === "events") {
    await db
      .insert(events)
      .values({ ...item })
      .onConflictDoUpdate({
        set: {
          ...item,
        },
        target: events.slug,
        where: eq(events.slug, item.slug),
      })
      .returning();

    revalidatePath("/cms/events");

    return;
  }

  if (type === "posts") {
    await db
      .insert(posts)
      .values({ ...item })
      .returning();

    revalidatePath("/cms/posts");

    return;
  }

  if (type === "profiles") {
    await db
      .insert(profiles)
      .values({ ...item })
      .returning();

    revalidatePath("/cms/profiles");

    return;
  }

  if (type === "companies") {
    await db
      .insert(companies)
      .values({ ...item, id: slugify(item.name) })
      .returning();

    revalidatePath("/cms/companies");

    return;
  }

  if (type === "jobs") {
    await db
      .insert(jobs)
      .values({
        ...item,
      })
      .returning();

    revalidatePath("/cms/jobs");

    return;
  }
}
