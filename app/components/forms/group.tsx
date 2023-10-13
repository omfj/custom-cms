import { Form } from "@remix-run/react";
import type { GroupType } from "~/db/schemas";

type GroupFormProps = {
  groupTypes: Array<GroupType>;
};

export function GroupForm({ groupTypes }: GroupFormProps) {
  return (
    <div className="p-8 space-y-8 w-full">
      <h1 className="text-2xl font-bold">Lag ny gruppe</h1>

      <Form action="/cms/groups/new" className="space-y-4" method="post">
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
          <label className="font-medium text-lg" htmlFor="groupType">
            Type
          </label>
          <select
            className="border form-select border-neutral-700 p-1 rounded bg-transparent"
            name="groupType"
            id="groupType"
          >
            {groupTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
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
