import { schemaHrefs, schemaLabels, schemas } from "@/lib/schemas";
import { LayoutProps } from "@/types";
import Link from "next/link";

export default function CMSLayout({ children }: LayoutProps) {
  return (
    <>
      <aside className="z-30 lg:block w-full max-w-[18rem] sticky top-0 max-h-screen overflow-y-auto h-screen border-r border-r-neutral-700 hidden">
        <section className="bg-neutral-900">
          <h2 className="text-lg h-14 border-b border-neutral-700 flex items-center font-semibold px-4">
            echo CMS
          </h2>
        </section>

        <section>
          <nav className="flex flex-col w-full lg:overflow-y-auto">
            <ul className="flex flex-col gap-1">
              {schemas.map((schema) => (
                <Link
                  key={schema}
                  className="px-4 py-2 hover:bg-[#2e2e2e] w-full"
                  href={schemaHrefs[schema]}
                >
                  <li>{schemaLabels[schema]}</li>
                </Link>
              ))}
            </ul>
          </nav>
        </section>
      </aside>

      {children}
    </>
  );
}
