import { type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { eq } from "drizzle-orm";
import { CompanyOverview } from "~/components/overviews/company";
import { EventOverview } from "~/components/overviews/event";
import { GroupOverview } from "~/components/overviews/group";
import { JobOverview } from "~/components/overviews/job";
import { LocationOverview } from "~/components/overviews/location";
import { PostOverview } from "~/components/overviews/post";
import { ProfileOverview } from "~/components/overviews/profile";
import { db } from "~/db/drizzle.server";
import { isSchema } from "~/lib/schemas";
import { notFound } from "~/utils.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const { resource, id } = params;

  if (!isSchema(resource) || !id) {
    return notFound();
  }

  switch (resource) {
    case "events":
      const event = await db.query.events.findFirst({
        where: (e) => eq(e.slug, id),
      });
      return {
        resource,
        item: event,
      };
    case "posts":
      const post = await db.query.posts.findFirst({
        where: (p) => eq(p.id, id),
      });
      return {
        resource,
        item: post,
      };
    case "companies":
      const company = await db.query.companies.findFirst({
        where: (c) => eq(c.id, id),
      });
      return {
        resource,
        item: company,
      };
    case "jobs":
      const job = await db.query.jobs.findFirst({
        where: (j) => eq(j.slug, id),
      });
      return {
        resource,
        item: job,
      };
    case "profiles":
      const profile = await db.query.profiles.findFirst({
        where: (p) => eq(p.id, id),
      });
      return {
        resource,
        item: profile,
      };
    case "static-pages":
      // TODO
      break;
    case "locations":
      const location = await db.query.locations.findFirst({
        where: (l) => eq(l.id, id),
      });
      return {
        resource,
        item: location,
      };
    case "groups":
      const group = await db.query.groups.findFirst({
        where: (g) => eq(g.id, id),
      });
      return {
        resource,
        item: group,
      };
    case "meetings":
      // TODO
      break;
    default:
      return notFound();
  }
}

export default function CmsResource() {
  const { resource, item } = useLoaderData<typeof loader>();

  if (!item) {
    return <p>Not found</p>;
  }

  if (resource === "events") {
    //@ts-ignore
    return <EventOverview event={item} />;
  }

  if (resource === "posts") {
    //@ts-ignore
    return <PostOverview post={item} />;
  }

  if (resource === "companies") {
    return <CompanyOverview company={item} />;
  }

  if (resource === "jobs") {
    return <JobOverview job={item} />;
  }

  if (resource === "profiles") {
    return <ProfileOverview profile={item} />;
  }

  if (resource === "locations") {
    return <LocationOverview location={item} />;
  }

  if (resource === "groups") {
    return <GroupOverview group={item} />;
  }

  /**
   * This part is unreachable, but added for completeness.
   *
   * The type of resource is never
   * The type of item is never
   */
  return null;
}
