import { Form } from "@remix-run/react";
import type { Group } from "~/db/schemas";

type PostFormProps = {
  groups: Array<Group>;
};

export function PostForm({ groups }: PostFormProps) {
  return (
    <div className="p-8 space-y-8 w-full">
      <h1 className="text-2xl font-bold">Lag nytt innlegg</h1>

      <Form action="/cms/posts/new" className="space-y-4" method="post">
        <div className="flex flex-col gap-1">
          <label className="font-medium text-lg" htmlFor="title">
            Title
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
          <label className="font-medium text-lg" htmlFor="publishedBy">
            Publisert av
          </label>
          <select
            className="border form-select border-neutral-700 p-1 rounded bg-transparent"
            name="publishedBy"
            id="publishedBy"
          >
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
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
