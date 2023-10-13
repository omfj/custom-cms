import { Form } from "@remix-run/react";

export function CompanyForm() {
  return (
    <div className="p-8 space-y-8 w-full">
      <h1 className="text-2xl font-bold">Lag nytt selskap</h1>

      <Form action="/cms/companies/new" className="space-y-4" method="post">
        <div className="flex flex-col gap-1">
          <label className="font-medium text-lg" htmlFor="name">
            Navn
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="border form-input border-neutral-700 p-1 rounded bg-transparent"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium text-lg" htmlFor="description">
            Beskrivelse
          </label>
          <textarea
            name="description"
            id="name"
            className="border form-textarea border-neutral-700 p-1 rounded bg-transparent"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium text-lg" htmlFor="website">
            Nettside
          </label>
          <input
            type="url"
            name="website"
            id="website"
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
