import { Form } from "@remix-run/react";
import type { Company, JobType } from "~/db/schemas";

type JobFormProps = {
  companies: Array<Company>;
  jobTypes: Array<JobType>;
};

export function JobForm({ companies, jobTypes }: JobFormProps) {
  return (
    <div className="p-8 space-y-8 w-full">
      <h1 className="text-2xl font-bold">Lag ny jobbannonse</h1>

      <Form action="/cms/jobs/new" className="space-y-4" method="post">
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
          <label className="font-medium text-lg" htmlFor="jobType">
            Type
          </label>
          <select
            className="border form-select border-neutral-700 p-1 rounded bg-transparent"
            name="jobType"
            id="jobType"
          >
            {jobTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-lg" htmlFor="company">
            Bedrift
          </label>
          <select
            className="border form-select border-neutral-700 p-1 rounded bg-transparent"
            name="company"
            id="company"
          >
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
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
          <label className="font-medium text-lg" htmlFor="applicationUrl">
            Søknadslenke
          </label>
          <input
            type="text"
            name="applicationUrl"
            id="applicationUrl"
            className="border form-input border-neutral-700 p-1 rounded bg-transparent"
          />
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
