import type { Company } from "~/db/schemas";

type CompanyOverviewProps = {
  company: Company;
};

export function CompanyOverview({ company }: CompanyOverviewProps) {
  return (
    <div className="w-full p-8 flex flex-col gap-4">
      <div>
        <p className="text-sm font-bold">Tittel:</p>
        <p className="text-lg">{company.name}</p>
      </div>
      <div>
        <p className="text-sm font-bold">Id:</p>
        <p className="text-lg">{company.id}</p>
      </div>
      <div>
        <p className="text-sm font-bold">Beskrivelse:</p>
        <p className="text-lg space-y-2">
          {company.description ?? "Ingen beskrivelse"}
        </p>
      </div>
      <div>
        <p className="text-sm font-bold">Nettside:</p>
        <p className="text-lg">{company.website ?? "Ingen nettside"}</p>
      </div>
    </div>
  );
}
