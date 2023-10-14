"use server";

import { db } from "@/db/drizzle";
import {
  Event,
  Job,
  Post,
  Profile,
  events,
  jobs,
  posts,
  profiles,
} from "@/db/schemas";
import { revalidatePath } from "next/cache";

type CreateItemProps =
  | {
      type: "events";
      item: Event;
    }
  | {
      type: "posts";
      item: Post;
    }
  | {
      type: "profiles";
      item: Profile;
    }
  | {
      type: "jobs";
      item: Job;
    };

export async function createItem({ type, item }: CreateItemProps) {
  if (type === "events") {
    await db
      .insert(events)
      .values({ ...item })
      .returning();

    return;
  }

  if (type === "posts") {
    await db
      .insert(posts)
      .values({ ...item })
      .returning();

    return;
  }

  if (type === "profiles") {
    await db
      .insert(profiles)
      .values({ ...item })
      .returning();

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
