"use client";

import { useState } from "react";
import { SidebarItem } from "./sidebar-item";
import { X } from "lucide-react";

type SidebarItem = {
  id: string;
  title: string | null;
};

type SidebarListProps = {
  resource: string;
  items: Array<SidebarItem>;
};

export function SidebarList({ resource, items }: SidebarListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section>
      <div className="flex flex-row items-center justify-between px-4">
        <input
          type="text"
          placeholder="Søk..."
          onChange={(event) => setSearchTerm(event.target.value)}
          value={searchTerm}
          className="h-10 bg-transparent p-0 text-neutral-100 placeholder-neutral-500 flex-1 focus:outline-none focus:ring-0 border-0"
        />
        <div>
          <X className="w-6 h-6 text-neutral-300 p-1 hover:bg-neutral-700 rounded" />
        </div>
      </div>

      <nav className="flex flex-col w-full lg:overflow-y-auto">
        <ul className="flex flex-col">
          {filteredItems.map((item) => (
            <SidebarItem
              key={item.id}
              href={`/cms/${resource}/item/${item.id}`}
            >
              <li className="truncate">{item.title ?? item.id}</li>
            </SidebarItem>
          ))}
        </ul>
      </nav>
    </section>
  );
}
