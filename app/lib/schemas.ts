export const schemas = [
  "companies",
  "events",
  "groups",
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
  events: "Arrangementer",
  groups: "Grupper",
  jobs: "Jobber",
  locations: "Lokasjoner",
  posts: "Innlegg",
  "static-pages": "Statiske sider",
  meetings: "Møter",
  profiles: "Profiler",
};

export const schemaHrefs = {
  companies: "/cms/companies",
  events: "/cms/events",
  groups: "/cms/groups",
  jobs: "/cms/jobs",
  posts: "/cms/posts",
  locations: "/cms/locations",
  "static-pages": "/cms/static-pages",
  meetings: "/cms/meetings",
  profiles: "/cms/profiles",
};

export const isSchema = (schema: string | undefined): schema is Schema => {
  if (schema === undefined) return false;
  return schemas.includes(schema as any);
};
