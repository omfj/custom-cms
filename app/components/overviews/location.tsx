import type { Location } from "~/db/schemas";

type LocationOverviewProps = {
  location: Location;
};

export function LocationOverview({ location }: LocationOverviewProps) {
  return (
    <div className="w-full p-8 flex flex-col gap-4">
      <div>
        <p className="text-sm font-bold">Navn:</p>
        <p className="text-lg">{location.name}</p>
      </div>
      <div>
        <p className="text-sm font-bold">ID:</p>
        <p className="text-lg">{location.id}</p>
      </div>
      <div>
        <p className="text-sm font-bold">Google Maps:</p>
        <p className="text-lg">{location.googleMapsUrl}</p>
      </div>
      <div>
        <p className="text-sm font-bold">Mazemap:</p>
        <p className="text-lg">{location.mazemapUrl}</p>
      </div>
    </div>
  );
}
