import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "echo CMS" }];
};

export default function Index() {
  return (
    <div className="min-h-screen w-full flex flex-col gap-4 justify-center items-center">
      <h1 className="text-4xl font-bold">Velkommen til echo CMS</h1>

      <Link
        className="font-medium inline-block py-2 px-4 bg-blue-900"
        to="/cms"
      >
        Logg inn
      </Link>
    </div>
  );
}
