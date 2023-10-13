import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CompanyForm } from "~/components/forms/company";
import { EventForm } from "~/components/forms/event";
import { GroupForm } from "~/components/forms/group";
import { JobForm } from "~/components/forms/job";
import { LocationForm } from "~/components/forms/location";
import { PostForm } from "~/components/forms/post";
import { ProfileForm } from "~/components/forms/profile";
import { db } from "~/db/drizzle.server";
import {
  companies,
  eventTypes,
  groupTypes,
  groups,
  jobTypes,
  locations,
  posts,
  profiles,
} from "~/db/schemas";
import { isSchema, schemaLabels } from "~/lib/schemas";
import { slugify } from "~/lib/slugify";
import { notFound } from "~/utils.server";

export async function action({ params, request }: ActionFunctionArgs) {
  const { resource } = params;

  if (!isSchema(resource)) {
    return notFound();
  }

  const formData = await request.formData();
  const obj = Object.fromEntries(formData.entries());

  if (resource === "companies") {
    const { name, description, website } = obj as {
      name: string;
      description: string;
      website: string;
    };

    const company = (
      await db
        .insert(companies)
        .values({
          id: slugify(name),
          name,
          description,
          website,
        })
        .returning()
    )[0];

    return redirect(`/cms/companies/item/${company.id}`);
  }

  if (resource === "posts") {
    const { title, body, publishedBy } = obj as {
      title: string;
      body: string;
      publishedBy: string;
    };

    const post = (
      await db
        .insert(posts)
        .values({
          title,
          body,
          publishedBy,
        })
        .returning()
    )[0];

    return redirect(`/cms/posts/item/${post.id}`);
  }

  if (resource === "profiles") {
    const { name } = obj as {
      name: string;
    };

    const profile = (
      await db
        .insert(profiles)
        .values({
          name,
        })
        .returning()
    )[0];

    return redirect(`/cms/profiles/item/${profile.id}`);
  }

  return redirect("/");
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { resource } = params;

  if (!isSchema(resource)) {
    return notFound();
  }

  if (resource === "events") {
    const c = await db.select().from(companies);
    const g = await db.select().from(groups);
    const t = await db.select().from(eventTypes);
    const l = await db.select().from(locations);
    return {
      resource,
      payload: {
        companies: c,
        groups: g,
        eventTypes: t,
        locations: l,
      },
    };
  }

  if (resource === "groups") {
    const t = await db.select().from(groupTypes);
    return {
      resource,
      payload: {
        groupTypes: t,
      },
    };
  }

  if (resource === "jobs") {
    const t = await db.select().from(jobTypes);
    const c = await db.select().from(companies);

    return {
      resource,
      payload: {
        jobTypes: t,
        companies: c,
      },
    };
  }

  if (resource === "posts") {
    const g = await db.select().from(groups);
    return {
      resource,
      payload: {
        groups: g,
      },
    };
  }

  return {
    resource,
    payload: null,
  };
}

export default function CmsResource() {
  const { resource, payload } = useLoaderData<typeof loader>();

  if (resource === "companies") {
    return <CompanyForm />;
  }

  if (resource === "events") {
    const { companies, groups, eventTypes, locations } = payload;
    return (
      <EventForm
        companies={companies}
        groups={groups}
        eventTypes={eventTypes}
        locations={locations}
      />
    );
  }

  if (resource === "groups") {
    const { groupTypes } = payload;
    return <GroupForm groupTypes={groupTypes} />;
  }

  if (resource === "jobs") {
    const { jobTypes, companies } = payload;
    return <JobForm jobTypes={jobTypes} companies={companies} />;
  }

  if (resource === "locations") {
    return <LocationForm />;
  }

  if (resource === "posts") {
    const { groups } = payload;
    return <PostForm groups={groups} />;
  }

  if (resource === "profiles") {
    return <ProfileForm />;
  }

  return (
    <div className="w-full p-8">
      <h1>lag ny {schemaLabels[resource]}</h1>
    </div>
  );
}
