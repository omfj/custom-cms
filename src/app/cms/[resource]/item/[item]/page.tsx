import { db } from "@/db/drizzle";
import { isSchema, schemaTables } from "@/lib/schemas";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

type Props = {
  params: {
    resource: string;
    item: string;
  };
};

export default async function ItemPage({ params }: Props) {
  const { resource, item } = params;

  if (!isSchema(resource)) {
    return notFound();
  }

  const table = schemaTables[resource];

  if (table === null) {
    return notFound();
  }

  let i = null;

  if ("id" in table) {
    i = (await db.select().from(table).where(eq(table.id, item)))[0];
  } else if ("slug" in table) {
    i = (await db.select().from(table).where(eq(table.slug, item)))[0];
  }

  if (i === null) {
    return notFound();
  }

  return (
    <main className="w-full p-8 flex flex-col gap-4">
      <h1>
        You are viewing an {resource}/{item}
      </h1>

      <div>
        <p>{JSON.stringify(i, null, 2)}</p>
      </div>
    </main>
  );
}
