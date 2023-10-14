import { isSchema, schemaTables } from "@/lib/schemas";
import { notFound } from "next/navigation";
import {
  CompanyView,
  EventTypeView,
  EventView,
  GroupTypeView,
  GroupView,
  JobTypeView,
  JobView,
  LocationView,
  PostView,
  ProfileView,
} from "./views";

type Props = {
  params: {
    resource: string;
    item: string;
  };
};

export default async function ItemPage({ params }: Props) {
  const { resource, item } = params;

  if (!isSchema(resource)) {
    return notFound();
  }

  const table = schemaTables[resource];

  if (table === null) {
    return notFound();
  }

  return (
    <>
      {resource === "companies" && <CompanyView item={item} />}
      {resource === "event-types" && <EventTypeView item={item} />}
      {resource === "events" && <EventView item={item} />}
      {resource === "group-types" && <GroupTypeView item={item} />}
      {resource === "groups" && <GroupView item={item} />}
      {resource === "job-types" && <JobTypeView item={item} />}
      {resource === "jobs" && <JobView item={item} />}
      {resource === "locations" && <LocationView item={item} />}
      {resource === "meetings" && null}
      {resource === "posts" && <PostView item={item} />}
      {resource === "profiles" && <ProfileView item={item} />}
    </>
  );
}
