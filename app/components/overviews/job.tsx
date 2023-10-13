import type { Job } from "~/db/schemas";

type JobOverviewProps = {
  job: Job;
};

export function JobOverview({ job }: JobOverviewProps) {
  return (
    <div className="w-full p-8 flex flex-col gap-4">
      <div>
        <p className="text-sm font-bold">Tittel:</p>
        <p className="text-lg">{job.title}</p>
      </div>
      <div>
        <p className="text-sm font-bold">Slug:</p>
        <p className="text-lg">{job.slug}</p>
      </div>
      <div>
        <p className="text-sm font-bold">Brødtekst:</p>
        <article className="text-lg space-y-2">
          {job.body
            ? job.body.split("\n").map((p, i) => <p key={i}>{p}</p>)
            : "Ingen brødtekst"}
        </article>
      </div>
      <div>
        <p className="text-sm font-bold">Selskap:</p>
        <p className="text-lg">{job.companyId}</p>
      </div>
      <div>
        <p className="text-sm font-bold">Søknads-url:</p>
        <p className="text-lg">{job.applicationUrl}</p>
      </div>
      <div>
        <p className="text-sm font-bold">Jobbtype:</p>
        <p className="text-lg">{job.jobTypeId}</p>
      </div>
    </div>
  );
}
