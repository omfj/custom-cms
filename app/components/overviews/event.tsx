import type { Event } from "~/db/schemas";
import { formatedDate } from "~/lib/date";

type EventOverviewProps = {
  event: Event;
};

export function EventOverview({ event }: EventOverviewProps) {
  return (
    <div className="w-full p-8 flex flex-col gap-4">
      <div>
        <p className="text-sm font-bold">Tittel:</p>
        <p className="text-lg">{event.title}</p>
      </div>
      <div>
        <p className="text-sm font-bold">Slug:</p>
        <p className="text-lg">{event.slug}</p>
      </div>
      <div>
        <p className="text-sm font-bold">Dato:</p>
        <p className="text-lg">
          {event.date ? formatedDate(event.date) : "Ingen dato"}
        </p>
      </div>
      <div>
        <p className="text-sm font-bold">Brødtekst:</p>
        <article className="text-lg space-y-2">
          {event.body
            ? event.body.split("\n").map((p, i) => <p key={i}>{p}</p>)
            : "Ingen brødtekst"}
        </article>
      </div>
      <div>
        <p className="text-sm font-bold">Registrerings-start:</p>
        <p className="text-lg">
          {event.registrationStart
            ? formatedDate(event.registrationStart)
            : "Ingen registrerings-start"}
        </p>
      </div>
      <div>
        <p className="text-sm font-bold">Registrerings-slutt:</p>
        <p className="text-lg">
          {event.registrationEnd
            ? formatedDate(event.registrationEnd)
            : "Ingen registrerings-slutt"}
        </p>
      </div>
      <div>
        <p className="text-sm font-bold">Gruppe:</p>
        <p className="text-lg">{event.groupId}</p>
      </div>
      <div>
        <p className="text-sm font-bold">Type:</p>
        <p className="text-lg">{event.eventTypeId}</p>
      </div>
      <div>
        <p className="text-sm font-bold">Selskap:</p>
        <p className="text-lg">{event.companyId}</p>
      </div>
      <div>
        <p className="text-sm font-bold">Lokasjon:</p>
        <p className="text-lg">{event.locationId}</p>
      </div>
    </div>
  );
}
