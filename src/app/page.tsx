import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col gap-4 justify-center items-center">
      <h1 className="text-4xl font-bold">Velkommen til echo CMS</h1>

      <Link
        className="font-medium inline-block py-2 px-4 bg-blue-900"
        href="/cms"
      >
        Logg inn
      </Link>
    </div>
  );
}
