import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "echo CMS",
  description: "echo CMS",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "relative w-full min-h-screen flex bg-neutral-900 text-gray-200",
          inter.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
