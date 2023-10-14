import { db } from "@/db/drizzle";
import { Schema, isSchema, schemaLabels, schemas } from "@/lib/schemas";
import { LayoutProps } from "@/types";
import { asc, desc } from "drizzle-orm";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const getItems = async (resource: Schema) => {
  if (resource === "event-types") {
    const eventTypes = await db.query.eventTypes.findMany({
      orderBy: (et) => asc(et.name),
    });
    return eventTypes.map((eventType) => ({
      id: eventType.id,
      title: eventType.name,
    }));
  }

  if (resource === "events") {
    const events = await db.query.events.findMany({
      orderBy: (e) => desc(e.date),
    });
    return events.map((event) => ({
      id: event.slug,
      title: event.title,
    }));
  }

  if (resource === "posts") {
    const posts = await db.query.posts.findMany({
      orderBy: (p) => desc(p.createdAt),
    });
    return posts.map((post) => ({
      id: post.slug,
      title: post.title,
    }));
  }

  if (resource === "companies") {
    const companies = await db.query.companies.findMany({
      orderBy: (c) => asc(c.name),
    });
    return companies.map((company) => ({
      id: company.id,
      title: company.name,
    }));
  }

  if (resource === "job-types") {
    const jobTypes = await db.query.jobTypes.findMany({
      orderBy: (jt) => asc(jt.name),
    });
    return jobTypes.map((jobType) => ({
      id: jobType.id,
      title: jobType.name,
    }));
  }

  if (resource === "jobs") {
    const jobs = await db.query.jobs.findMany({
      orderBy: (j) => asc(j.title),
    });
    return jobs.map((job) => ({
      id: job.slug,
      title: job.title,
    }));
  }

  if (resource === "profiles") {
    const profiles = await db.query.profiles.findMany({
      orderBy: (p) => asc(p.name),
    });
    return profiles.map((profile) => ({
      id: profile.id,
      title: profile.name,
    }));
  }

  if (resource === "static-pages") {
    return [];
  }

  if (resource === "locations") {
    const locations = await db.query.locations.findMany({
      orderBy: (l) => asc(l.name),
    });
    return locations.map((location) => ({
      id: location.id,
      title: location.name,
    }));
  }

  if (resource === "group-types") {
    const groupTypes = await db.query.groupTypes.findMany({
      orderBy: (gt) => asc(gt.name),
    });
    return groupTypes.map((groupType) => ({
      id: groupType.id,
      title: groupType.name,
    }));
  }

  if (resource === "groups") {
    const groups = await db.query.groups.findMany({
      orderBy: (g) => asc(g.name),
    });
    return groups.map((group) => ({
      id: group.id,
      title: group.name,
    }));
  }

  if (resource === "meetings") {
    return [];
  }

  return [];
};

export default async function CMSResourceLayout({
  children,
  params,
}: LayoutProps<{ resource: string }>) {
  const { resource } = params;

  if (!isSchema(resource)) {
    return notFound();
  }

  const items = await getItems(resource);

  return (
    <>
      <aside className="z-30 lg:block w-full max-w-[18rem] sticky top-0 max-h-screen overflow-y-auto h-screen border-r border-r-neutral-700 hidden">
        <section className="bg-neutral-900">
          <h2 className="text-lg h-14 border-b border-neutral-700 flex items-center font-semibold px-4">
            {schemaLabels[resource as (typeof schemas)[number]]}
          </h2>
        </section>

        <section>
          <Link
            className="px-4 py-2 bg-lime-900 hover:bg-lime-800 justify-between flex items-center w-full"
            href={`/cms/${resource}/new`}
          >
            <span>Lag ny</span>
            <PlusIcon
              className="inline-block text-neutral-400"
              strokeWidth="1.25px"
            />
          </Link>
        </section>

        <section>
          <nav className="flex flex-col w-full lg:overflow-y-auto">
            <ul className="flex flex-col gap-1">
              {items.map((item) => (
                <Link
                  key={item.id}
                  className="px-4 py-2 hover:bg-[#2e2e2e] w-full"
                  href={`/cms/${resource}/item/${item.id}`}
                >
                  <li className="truncate">{item.title}</li>
                </Link>
              ))}
            </ul>
          </nav>
        </section>
      </aside>

      {children}
    </>
  );
}
