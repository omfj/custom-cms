import { schemaHrefs, schemaLabels, schemas } from "@/lib/schemas";
import { LayoutProps } from "@/types";
import Link from "next/link";

export default function CMSLayout({ children }: LayoutProps) {
  return (
    <>
      <aside className="z-30 lg:block w-full max-w-[14rem] sticky top-0 max-h-screen overflow-y-auto h-screen border-r border-r-neutral-700 hidden p-2">
        <h2 className="text-xl p-4">
          <span>echo</span> <span className="font-bold">{'"CMS"'}</span>
        </h2>

        <nav className="flex flex-col w-full lg:overflow-y-auto">
          <ul className="flex flex-col gap-1">
            {schemas.map((schema) => (
              <Link
                key={schema}
                className="px-4 py-2 rounded-md hover:bg-[#2e2e2e] w-full"
                href={schemaHrefs[schema]}
              >
                <li>{schemaLabels[schema]}</li>
              </Link>
            ))}
          </ul>
        </nav>
      </aside>

      {children}
    </>
  );
}
