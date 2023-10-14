"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarItemProps = {
  href: string;
  children: React.ReactNode;
};

export function SidebarItem({ href, children }: SidebarItemProps) {
  const pathname = usePathname();

  return (
    <Link
      className={clsx("px-4 py-2 hover:bg-[#2e2e2e] w-full", {
        "bg-[#2e2e2e]": pathname === href,
      })}
      href={href}
    >
      {children}
    </Link>
  );
}
