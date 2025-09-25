import { sanityClient } from "@/sanity/client";
import { CATEGORIES_TOP } from "@/sanity/queries";
import Link from "next/link";

type Cat = { _id: string; title: string; slug: string };

export const dynamic = "force-static";
export const revalidate = 60;

export default async function ProyectosIndex() {
  const cats = await sanityClient.fetch<Cat[]>(CATEGORIES_TOP);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-medium mb-6">Proyectos</h1>
      <p className="text-neutral-600 mb-8">
        Elegí una categoría para ver los proyectos.
      </p>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cats.map((c) => (
          <li key={c._id} className="border rounded-lg p-4 hover:bg-neutral-50">
            <Link href={`/proyectos/${c.slug}`} className="font-medium">
              {c.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}