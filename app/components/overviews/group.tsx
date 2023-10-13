import type { Group } from "~/db/schemas";

type GroupOverviewProps = {
  group: Group;
};

export function GroupOverview({ group }: GroupOverviewProps) {
  return (
    <div className="w-full p-8 flex flex-col gap-4">
      <div>
        <p className="text-sm font-bold">Navn:</p>
        <p className="text-lg">{group.name}</p>
      </div>
      <div>
        <p className="text-sm font-bold">ID:</p>
        <p className="text-lg">{group.id}</p>
      </div>
      <div>
        <p className="text-sm font-bold">Type:</p>
        <p className="text-lg">{group.groupTypeId}</p>
      </div>
    </div>
  );
}
