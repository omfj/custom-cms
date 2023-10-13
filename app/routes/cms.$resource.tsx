import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useParams } from "@remix-run/react";
import { asc, desc } from "drizzle-orm";
import { PlusIcon } from "lucide-react";
import { db } from "~/db/drizzle.server";
import type { schemas } from "~/lib/schemas";
import { isSchema, schemaLabels } from "~/lib/schemas";
import { notFound } from "~/utils.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const { resource } = params;

  if (!isSchema(resource)) {
    return notFound();
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
      id: post.id,
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
}

export default function CmsResource() {
  const items = useLoaderData<typeof loader>();
  const { resource } = useParams();

  return (
    <>
      <aside className="z-30 lg:block w-full max-w-[18rem] sticky top-0 max-h-screen overflow-y-auto h-screen border-r border-r-neutral-700 hidden p-2">
        <h2 className="text-lg font-bold p-4">
          {schemaLabels[resource as (typeof schemas)[number]]}
        </h2>

        <nav className="flex flex-col w-full lg:overflow-y-auto">
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                className="px-4 py-2 rounded-md border border-neutral-700 justify-between hover:bg-[#2e2e2e] flex items-center w-full"
                to={`/cms/${resource}/new`}
              >
                <span>Lag ny</span>
                <PlusIcon className="inline-block" strokeWidth="1.25px" />
              </Link>
            </li>

            <hr className="my-3 border border-neutral-700" />

            {items.map((item) => (
              <Link
                key={item.id}
                className="px-4 py-2 rounded-md hover:bg-[#2e2e2e] w-full"
                to={`/cms/${resource}/item/${item.id}`}
              >
                <li className="truncate">{item.title}</li>
              </Link>
            ))}
          </ul>
        </nav>
      </aside>

      <Outlet />
    </>
  );
}
