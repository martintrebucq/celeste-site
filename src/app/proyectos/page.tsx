// src/app/proyectos/page.tsx
import Link from "next/link";
import { sanityClient } from "@/sanity/client";

type Cat = { _id: string; title: string; slug: string };

const ROOT_CATS_QUERY = `
*[_type=="category" && !defined(parent)] | order(coalesce(order,999) asc){
  _id, title, "slug": slug.current
}
`;

export const revalidate = 60;

export default async function ProyectosPage() {
  const cats = await sanityClient.fetch<Cat[]>(ROOT_CATS_QUERY);

  return (
    <main className="px-6 py-10">
      <h1 className="mb-6 text-3xl font-semibold">Proyectos</h1>
      <p className="text-neutral-600 mb-8">Elegí una categoría para ver los proyectos.</p>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((c) => (
          <li key={c._id}>
            <Link
              href={`/proyectos/${c.slug}`}
              className="block rounded border px-4 py-4 hover:bg-neutral-50"
            >
              {c.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
