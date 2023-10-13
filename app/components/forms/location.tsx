import { Form } from "@remix-run/react";

export function LocationForm() {
  return (
    <div className="p-8 space-y-8 w-full">
      <h1 className="text-2xl font-bold">Lag ny lokasjon</h1>

      <Form action="/cms/locations/new" className="space-y-4" method="post">
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
          <label className="font-medium text-lg" htmlFor="mazemapUrl">
            Mazemap URL
          </label>
          <input
            type="url"
            name="mazemapUrl"
            id="mazemapUrl"
            className="border form-input border-neutral-700 p-1 rounded bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-lg" htmlFor="googleMapsUrl">
            Google Maps URL
          </label>
          <input
            type="url"
            name="googleMapsUrl"
            id="googleMapsUrl"
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
