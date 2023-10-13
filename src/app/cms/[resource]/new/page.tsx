import * as schema from "@/db/schemas";
import { isSchema, schemaTables } from "@/lib/schemas";
import { Table, getTableColumns } from "drizzle-orm";
import { SQLiteTable } from "drizzle-orm/sqlite-core";
import { notFound } from "next/navigation";

type Props = {
  params: {
    resource: string;
  };
};

export function create<TTable extends Table>(table: TTable) {
  const columns = getTableColumns(table);
  const columnEntries = Object.entries(columns);

  return columnEntries;
}

export default function CreateItem({ params }: Props) {
  const { resource } = params;

  if (!isSchema(resource)) {
    return notFound();
  }

  const table = schemaTables[resource];

  if (!table) {
    return notFound();
  }

  const entries = create(table);

  return (
    <main className="p-4">
      {entries.map((entry) => (
        <div key={entry["0"]}>
          <p>{entry[0]}</p>
        </div>
      ))}
    </main>
  );
}
