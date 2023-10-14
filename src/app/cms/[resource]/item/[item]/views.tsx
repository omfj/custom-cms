import {
  CompanyForm,
  EventForm,
  EventTypeForm,
  GroupForm,
  GroupTypeForm,
  JobForm,
  JobTypeForm,
  LocationForm,
  PostForm,
  ProfileForm,
} from "@/components/forms";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

type DefaultProps<T extends string | number> = {
  item: T;
};

export async function CompanyView({ item }: DefaultProps<string>) {
  const company = await db.query.companies.findFirst({
    where: (c) => eq(c.id, item),
  });

  if (!company) {
    return notFound();
  }

  return (
    <CompanyForm
      title={company.name}
      form={{
        ...company,
      }}
    />
  );
}

export async function EventTypeView({ item }: DefaultProps<string>) {
  const eventType = await db.query.eventTypes.findFirst({
    where: (et) => eq(et.id, item),
  });

  if (!eventType) {
    return notFound();
  }

  return (
    <EventTypeForm
      title={eventType.name ?? ""}
      form={{
        ...eventType,
      }}
    />
  );
}

export async function EventView({ item }: DefaultProps<string>) {
  const event = await db.query.events.findFirst({
    where: (e) => eq(e.slug, item),
  });

  if (!event) {
    return notFound();
  }

  const [companies, eventTypes, groups, locations] = await Promise.all([
    db.query.companies.findMany(),
    db.query.eventTypes.findMany(),
    db.query.groups.findMany(),
    db.query.locations.findMany(),
  ]);

  return (
    <EventForm
      title={event.title ?? ""}
      form={{
        ...event,
      }}
      companies={companies}
      eventTypes={eventTypes}
      groups={groups}
      locations={locations}
    />
  );
}

export async function GroupTypeView({ item }: DefaultProps<string>) {
  const groupType = await db.query.groupTypes.findFirst({
    where: (gt) => eq(gt.id, item),
  });

  if (!groupType) {
    return notFound();
  }

  return (
    <GroupTypeForm
      title={groupType.name ?? ""}
      form={{
        ...groupType,
      }}
    />
  );
}

export async function GroupView({ item }: DefaultProps<string>) {
  const group = await db.query.groups.findFirst({
    where: (g) => eq(g.id, item),
  });

  if (!group) {
    return notFound();
  }

  const groupTypes = await db.query.groupTypes.findMany();

  return (
    <GroupForm
      title={group.name ?? ""}
      form={{
        ...group,
      }}
      groupTypes={groupTypes}
    />
  );
}

export async function JobTypeView({ item }: DefaultProps<string>) {
  const jobType = await db.query.jobTypes.findFirst({
    where: (jt) => eq(jt.id, item),
  });

  if (!jobType) {
    return notFound();
  }

  return (
    <JobTypeForm
      title={jobType.name ?? ""}
      form={{
        ...jobType,
      }}
    />
  );
}

export async function JobView({ item }: DefaultProps<string>) {
  const job = await db.query.jobs.findFirst({
    where: (j) => eq(j.slug, item),
  });

  if (!job) {
    return notFound();
  }

  const [companies, jobTypes] = await Promise.all([
    db.query.companies.findMany(),
    db.query.jobTypes.findMany(),
  ]);

  return (
    <JobForm
      title={job.title ?? ""}
      form={{
        ...job,
      }}
      companies={companies}
      jobTypes={jobTypes}
    />
  );
}

export async function LocationView({ item }: DefaultProps<string>) {
  const location = await db.query.locations.findFirst({
    where: (l) => eq(l.id, item),
  });

  if (!location) {
    return notFound();
  }

  return (
    <LocationForm
      title={location.name ?? ""}
      form={{
        ...location,
      }}
    />
  );
}

export async function PostView({ item }: DefaultProps<string>) {
  const post = await db.query.posts.findFirst({
    where: (p) => eq(p.slug, item),
  });

  if (!post) {
    return notFound();
  }

  return (
    <PostForm
      title={post.title ?? ""}
      form={{
        ...post,
      }}
    />
  );
}

export async function ProfileView({ item }: DefaultProps<string>) {
  const profile = await db.query.profiles.findFirst({
    where: (p) => eq(p.id, item),
  });

  if (!profile) {
    return notFound();
  }

  return (
    <ProfileForm
      title={profile.name ?? ""}
      form={{
        ...profile,
      }}
    />
  );
}
