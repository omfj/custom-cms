import {
  companies,
  eventTypes,
  events,
  groupTypes,
  groups,
  jobTypes,
  jobs,
  locations,
  posts,
  profiles,
} from "@/db/schemas";

export const schemas = [
  "companies",
  "event-types",
  "events",
  "group-types",
  "groups",
  "job-types",
  "jobs",
  "locations",
  "posts",
  "static-pages",
  "meetings",
  "profiles",
] as const;

export type Schema = (typeof schemas)[number];

export const schemaLabels = {
  companies: "Selskaper",
  "event-types": "Arrangement-typer",
  events: "Arrangementer",
  "group-types": "Gruppe-typer",
  groups: "Grupper",
  "job-types": "Jobb-typer",
  jobs: "Jobber",
  locations: "Lokasjoner",
  posts: "Innlegg",
  "static-pages": "Statiske sider",
  meetings: "Møter",
  profiles: "Profiler",
};

export const schemaHrefs = {
  companies: "/cms/companies",
  "event-types": "/cms/event-types",
  events: "/cms/events",
  "group-types": "/cms/group-types",
  groups: "/cms/groups",
  "job-types": "/cms/job-types",
  jobs: "/cms/jobs",
  posts: "/cms/posts",
  locations: "/cms/locations",
  "static-pages": "/cms/static-pages",
  meetings: "/cms/meetings",
  profiles: "/cms/profiles",
};

export const schemaTables = {
  companies: companies,
  "event-types": eventTypes,
  events: events,
  "group-types": groupTypes,
  groups: groups,
  "job-types": jobTypes,
  jobs: jobs,
  posts: posts,
  locations: locations,
  "static-pages": null,
  meetings: null,
  profiles: profiles,
};

export const isSchema = (schema: string | undefined): schema is Schema => {
  if (schema === undefined) return false;
  return schemas.includes(schema as any);
};
