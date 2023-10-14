"use client";

import { FormControl } from "@/components/form-control";
import { Heading } from "@/components/heading";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import {
  Company,
  Event,
  EventType,
  Group,
  GroupType,
  Job,
  JobType,
  Location,
  Post,
  Profile,
} from "@/db/schemas";
import { useState } from "react";
import { Select } from "./select";
import { Textarea } from "./textarea";
import { createItem } from "@/app/cms/[resource]/new/actions";
import { slugify } from "@/lib/slugify";
import { Button } from "./button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

type DefaultProps<T> = {
  title: string;
  form: T;
};

function BaseForm({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const href = pathname.split("/").slice(0, -2).join("/");

  return (
    <main className="relative w-full">
      <section className="sticky top-0 items-center flex border-b border-neutral-700 px-4 h-14 bg-neutral-900">
        <Link href={href}>
          <ArrowLeft className="inline-block mr-2 lg:hidden" />
        </Link>
        <Heading>{title}</Heading>
      </section>

      <section className="p-4">{children}</section>
    </main>
  );
}

type CompanyFormProps = DefaultProps<Omit<Company, "id">>;

export function CompanyForm({ title, form }: CompanyFormProps) {
  const [name, setName] = useState(form.name ?? "");
  const [description, setDescription] = useState(form.description ?? "");
  const [website, setWebsite] = useState(form.website ?? "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createItem({
      type: "companies",
      item: {
        name,
        description,
        website,
      },
    });
  };

  return (
    <BaseForm title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormControl>
          <Label>Navn:</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl>
          <Label>Beskrivelse:</Label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Label>URL:</Label>
          <Input value={website} onChange={(e) => setWebsite(e.target.value)} />
        </FormControl>

        <div className="flex items-center gap-1">
          <Button>Lagre</Button>
        </div>
      </form>
    </BaseForm>
  );
}

type EventTypesFormProps = DefaultProps<Omit<EventType, "id">>;

export function EventTypeForm({ title, form }: EventTypesFormProps) {
  return (
    <BaseForm title={title}>
      <form className="space-y-4">
        <FormControl>
          <Label>Navn:</Label>
          <Input value={form.name ?? ""} />
        </FormControl>

        <div className="flex items-center gap-1">
          <Button>Lagre</Button>
        </div>
      </form>
    </BaseForm>
  );
}

type EventFormProps = DefaultProps<Event> & {
  groups: Array<Group>;
  eventTypes: Array<EventType>;
  companies: Array<Company>;
  locations: Array<Location>;
};

export function EventForm({
  title: pageTitle,
  form,
  groups,
  locations,
  eventTypes,
  companies,
}: EventFormProps) {
  const [title, setTitle] = useState(form.title ?? "");
  const [slug, setSlug] = useState(form.slug ?? "");
  const [date, setDate] = useState(form.date);
  const [registrationStart, setRegistrationStart] = useState(
    form.registrationStart
  );
  const [registrationEnd, setRegistrationEnd] = useState(form.registrationEnd);
  const [groupId, setGroupId] = useState(form.groupId ?? "");
  const [eventTypeId, setEventTypeId] = useState(form.eventTypeId ?? "");
  const [companyId, setCompanyId] = useState(form.companyId ?? "");
  const [locationId, setLocationId] = useState(form.locationId ?? "");

  const generateSlug = () => {
    setSlug(slugify(title));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createItem({
      type: "events",
      item: {
        title,
        slug,
        date,
        registrationStart,
        registrationEnd,
        groupId,
        eventTypeId,
        companyId,
        locationId,
      },
    });
  };

  return (
    <BaseForm title={pageTitle}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormControl>
          <Label>Tittel:</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl>
          <Label>Slug:</Label>
          <div className="grid grid-cols-4 gap-1">
            <Input
              className="col-span-3"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            <button
              type="button"
              onClick={generateSlug}
              className="border border-neutral-700 py-1 px-2"
            >
              Generer
            </button>
          </div>
        </FormControl>
        <FormControl>
          <Label>Dato:</Label>
          <Input
            type="datetime-local"
            value={date?.toISOString().split(".")[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </FormControl>
        <FormControl>
          <Label>Påmelding åpner:</Label>
          <Input
            type="datetime-local"
            value={registrationStart?.toISOString().split(".")[0]}
            onChange={(e) => setRegistrationStart(new Date(e.target.value))}
          />
        </FormControl>
        <FormControl>
          <Label>Påmelding stenger:</Label>
          <Input
            type="datetime-local"
            value={registrationEnd?.toISOString().split(".")[0]}
            onChange={(e) => setRegistrationEnd(new Date(e.target.value))}
          />
        </FormControl>
        <FormControl>
          <Label>Gruppe:</Label>
          <Select value={groupId} onChange={(e) => setGroupId(e.target.value)}>
            <option>Ingen</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Label>Arrangement-type:</Label>
          <Select
            value={eventTypeId}
            onChange={(e) => setEventTypeId(e.target.value)}
          >
            <option>Ingen</option>
            {eventTypes.map((eventType) => (
              <option key={eventType.id} value={eventType.id}>
                {eventType.name}
              </option>
            ))}
          </Select>
        </FormControl>
        {eventTypeId === "bedpres" && (
          <FormControl>
            <Label>Selskap:</Label>
            <Select
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
            >
              <option>Ingen</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </Select>
          </FormControl>
        )}
        <FormControl>
          <Label>Sted:</Label>
          <Select
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
          >
            <option>Ingen</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <div className="flex items-center gap-1">
          <Button>Lagre</Button>
        </div>
      </form>
    </BaseForm>
  );
}

type GroupTypeFormProps = DefaultProps<Omit<EventType, "id">>;

export function GroupTypeForm({ title, form }: GroupTypeFormProps) {
  const [name, setName] = useState(form.name ?? "");

  return (
    <BaseForm title={title}>
      <form className="space-y-4">
        <FormControl>
          <Label>Navn:</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>

        <div className="flex items-center gap-1">
          <Button>Lagre</Button>
        </div>
      </form>
    </BaseForm>
  );
}

type GroupFormProps = DefaultProps<Omit<Group, "id">> & {
  groupTypes: Array<GroupType>;
};

export function GroupForm({ title, form, groupTypes }: GroupFormProps) {
  const [name, setName] = useState(form.name ?? "");
  const [groupType, setGroupType] = useState(form.groupTypeId ?? "");

  return (
    <BaseForm title={title}>
      <form className="space-y-4">
        <FormControl>
          <Label>Navn:</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl>
          <Label>Gruppe-type:</Label>
          <Select
            value={groupType}
            onChange={(e) => setGroupType(e.target.value)}
          >
            <option>Ingen</option>
            {groupTypes.map((groupType) => (
              <option key={groupType.id} value={groupType.id}>
                {groupType.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <div className="flex items-center gap-1">
          <Button>Lagre</Button>
        </div>
      </form>
    </BaseForm>
  );
}

type JobTypeFormProps = DefaultProps<Omit<JobType, "id">>;

export function JobTypeForm({ title, form }: JobTypeFormProps) {
  return (
    <BaseForm title={title}>
      <form className="space-y-4">
        <FormControl>
          <Label>Navn:</Label>
          <Input value={form.name ?? ""} />
        </FormControl>

        <div className="flex items-center gap-1">
          <Button>Lagre</Button>
        </div>
      </form>
    </BaseForm>
  );
}

type JobFormProps = DefaultProps<Omit<Job, "id">> & {
  companies: Array<Company>;
  jobTypes: Array<JobType>;
};

export function JobForm({
  title: pageTitle,
  form,
  jobTypes,
  companies,
}: JobFormProps) {
  const [title, setTitle] = useState(form.title ?? "");
  const [slug, setSlug] = useState(form.slug ?? "");
  const [jobType, setJobType] = useState(form.jobTypeId ?? "");
  const [company, setCompany] = useState(form.companyId ?? "");
  const [applicationUrl, setApplicationUrl] = useState(
    form.applicationUrl ?? ""
  );
  const [body, setBody] = useState(form.body ?? "");

  const generateSlug = () => {
    setSlug(slugify(title));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createItem({
      type: "jobs",
      item: {
        title,
        slug,
        jobTypeId: jobType,
        companyId: company,
        applicationUrl,
        body,
      },
    });
  };

  return (
    <BaseForm title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormControl>
          <Label>Tittel:</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl>
          <Label>Slug:</Label>
          <div className="grid grid-cols-4 gap-1">
            <Input
              className="col-span-3"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            <Button onClick={generateSlug}>Generer</Button>
          </div>
        </FormControl>
        <FormControl>
          <Label>Jobb-type:</Label>
          <Select
            name=""
            id=""
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option>Ingen</option>
            {jobTypes.map((jobType) => (
              <option key={jobType.id} value={jobType.id}>
                {jobType.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Label>Selskap:</Label>
          <Select
            name=""
            id=""
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          >
            <option>Ingen</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Label>Søknads-url:</Label>
          <Input
            value={applicationUrl}
            onChange={(e) => setApplicationUrl(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Label>Brødtekst:</Label>
          <Textarea
            className="h-40"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></Textarea>
        </FormControl>

        <div className="flex items-center gap-1">
          <Button>Lagre</Button>
        </div>
      </form>
    </BaseForm>
  );
}

type LocationFormProps = DefaultProps<Omit<Location, "id">>;

export function LocationForm({ title, form }: LocationFormProps) {
  const [name, setName] = useState(form.name ?? "");
  const [googleMapsUrl, setGoogleMapsUrl] = useState(form.googleMapsUrl ?? "");
  const [mazemapUrl, setMazemapUrl] = useState(form.mazemapUrl ?? "");

  return (
    <BaseForm title={title}>
      <form className="space-y-4">
        <FormControl>
          <Label>Navn:</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl>
          <Label>Google Maps URL:</Label>
          <Input
            value={googleMapsUrl}
            onChange={(e) => setGoogleMapsUrl(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Label>Mazemap URL:</Label>
          <Input
            value={mazemapUrl}
            onChange={(e) => setMazemapUrl(e.target.value)}
          />
        </FormControl>

        {/* TODO ADD ADDRESS */}

        <div className="flex items-center gap-1">
          <Button>Lagre</Button>
        </div>
      </form>
    </BaseForm>
  );
}

type PostFormProps = DefaultProps<Omit<Post, "id">>;

export function PostForm({ title: pageTitle, form }: PostFormProps) {
  const [title, setTitle] = useState(form.title ?? "");
  const [slug, setSlug] = useState(form.slug ?? "");
  const [publishedBy, setPublishedBy] = useState(form.publishedBy ?? "");
  const [body, setBody] = useState(form.body ?? "");

  const generateSlug = () => {
    setSlug(slugify(title));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createItem({
      type: "posts",
      item: {
        title,
        slug,
        publishedBy,
        body,
      },
    });
  };

  return (
    <BaseForm title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormControl>
          <Label>Tittel:</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl>
          <Label>Slug:</Label>
          <div className="grid grid-cols-4 gap-1">
            <Input
              className="col-span-3"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            <Button onClick={generateSlug}>Generer</Button>
          </div>
        </FormControl>
        <FormControl>
          <Label>Forfatter:</Label>
          <Input
            value={publishedBy}
            onChange={(e) => setPublishedBy(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Label>Brødtekst:</Label>
          <Textarea
            className="h-40"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></Textarea>
        </FormControl>

        <div className="flex items-center gap-1">
          <Button>Lagre</Button>
        </div>
      </form>
    </BaseForm>
  );
}

type ProfileFormProps = DefaultProps<Omit<Profile, "id">>;

export function ProfileForm({ title, form }: ProfileFormProps) {
  const [name, setName] = useState(form.name ?? "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createItem({
      type: "profiles",
      item: {
        name,
      },
    });
  };

  return (
    <BaseForm title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormControl>
          <Label>Navn:</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>

        <div className="flex items-center gap-1">
          <Button>Lagre</Button>
        </div>
      </form>
    </BaseForm>
  );
}
