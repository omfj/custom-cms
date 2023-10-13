import { Form } from "@remix-run/react";
import type { Company, EventType, Group, Location } from "~/db/schemas";

type EventFormProps = {
  companies: Array<Company>;
  groups: Array<Group>;
  eventTypes: Array<EventType>;
  locations: Array<Location>;
};

export function EventForm({
  companies,
  groups,
  eventTypes,
  locations,
}: EventFormProps) {
  return (
    <div className="p-8 space-y-8 w-full">
      <h1 className="text-2xl font-bold">Lag nytt arrangement</h1>

      <Form action="/cms/events/new" className="space-y-4" method="post">
        <div className="flex flex-col gap-1">
          <label className="font-medium text-lg" htmlFor="title">
            Tittel
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="border form-input border-neutral-700 p-1 rounded bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-lg" htmlFor="body">
            Brødtekst
          </label>
          <textarea
            name="body"
            id="body"
            rows={8}
            className="border form-textarea border-neutral-700 p-1 rounded bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-lg" htmlFor="date">
            Dato
          </label>
          <input
            type="datetime-local"
            name="date"
            id="date"
            className="border form-input border-neutral-700 p-1 rounded bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-lg" htmlFor="registrationStart">
            Påmelding åpner
          </label>
          <input
            type="datetime-local"
            name="registrationStart"
            id="registrationStart"
            className="border form-input border-neutral-700 p-1 rounded bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-lg" htmlFor="registrationEnd">
            Påmelding stenger
          </label>
          <input
            type="datetime-local"
            name="registrationEnd"
            id="registrationEnd"
            className="border form-input border-neutral-700 p-1 rounded bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-lg" htmlFor="companyId">
            Bedrift
          </label>
          <select
            className="border form-select border-neutral-700 p-1 rounded bg-transparent"
            name="companyId"
            id="companyId"
          >
            <option value={undefined}>Ingen</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-lg" htmlFor="eventTypeId">
            Type
          </label>
          <select
            className="border form-select border-neutral-700 p-1 rounded bg-transparent"
            name="eventTypeId"
            id="eventTypeId"
          >
            {eventTypes.map((eventType) => (
              <option key={eventType.id} value={eventType.id}>
                {eventType.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-lg" htmlFor="groupId">
            Gruppe
          </label>
          <select
            className="border form-select border-neutral-700 p-1 rounded bg-transparent"
            name="groupId"
            id="groupId"
          >
            <option value={undefined}>Ingen</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-lg" htmlFor="locationId">
            Sted
          </label>
          <select
            className="border form-select border-neutral-700 p-1 rounded bg-transparent"
            name="locationId"
            id="locationId"
          >
            <option value={undefined}>Ingen</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="font-medium inline-block py-2 px-4 bg-blue-900"
        >
          Lagre
        </button>
      </Form>
    </div>
  );
}
