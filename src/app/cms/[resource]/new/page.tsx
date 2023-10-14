import { isSchema } from "@/lib/schemas";
import { notFound } from "next/navigation";
import {
  CompanyForm,
  EventForm,
  EventTypeForm,
  GroupForm,
  GroupTypeForm,
  JobForm,
  JobTypeForm,
  ProfileForm,
} from "../../../../components/forms";
import { db } from "@/db/drizzle";

type Props = {
  params: {
    resource: string;
  };
};

export default async function CreateItem({ params }: Props) {
  const { resource } = params;

  if (!isSchema(resource)) {
    return notFound();
  }

  const [groupTypes, groups, locations, companies, eventTypes, jobTypes] =
    await Promise.all([
      db.query.groupTypes.findMany(),
      db.query.groups.findMany(),
      db.query.locations.findMany(),
      db.query.companies.findMany(),
      db.query.eventTypes.findMany(),
      db.query.jobTypes.findMany(),
    ]);

  return (
    <>
      {resource === "companies" && (
        <CompanyForm
          title="Lag nytt selskap"
          form={{
            name: "",
            description: "",
            website: "",
          }}
        />
      )}
      {resource === "event-types" && (
        <EventTypeForm
          title="Lag ny type arrangement"
          form={{
            name: "",
          }}
        />
      )}
      {resource === "events" && (
        <EventForm
          title="Lag nytt arrangement"
          form={{
            body: "",
            title: "",
            slug: "",
            companyId: "",
            eventTypeId: "",
            locationId: "",
            date: null,
            registrationStart: null,
            registrationEnd: null,
            groupId: "",
          }}
          groups={groups}
          companies={companies}
          eventTypes={eventTypes}
          locations={locations}
        />
      )}
      {resource === "group-types" && (
        <GroupTypeForm
          title="Lag ny type gruppe"
          form={{
            name: "",
          }}
        />
      )}
      {resource === "groups" && (
        <GroupForm
          title="Lag ny gruppe"
          form={{
            name: "",
            groupTypeId: "",
          }}
          groupTypes={groupTypes}
        />
      )}
      {resource === "job-types" && (
        <JobTypeForm
          title="Lag ny type jobb"
          form={{
            name: "",
          }}
        />
      )}
      {resource === "jobs" && (
        <JobForm
          title="Lag ny jobb"
          form={{
            slug: "",
            title: "",
            body: "",
            applicationUrl: "",
            companyId: "",
            jobTypeId: "",
          }}
          companies={companies}
          jobTypes={jobTypes}
        />
      )}
      {resource === "profiles" && (
        <ProfileForm
          title="Lag ny profil"
          form={{
            name: "",
          }}
        />
      )}
    </>
  );
}
