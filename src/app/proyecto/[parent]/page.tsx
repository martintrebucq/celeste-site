// src/app/proyectos/[parent]/page.tsx
import Link from "next/link";
import { sanityClient } from "@/sanity/client";

type Cat = { _id: string; title: string; slug: string };
type Proj = {
  _id: string;
  title: string;
  slug: string;
  location?: string;
  year?: number;
  cover?: { asset?: { _id: string }; alt?: string };
};

const SUBCATS_QUERY = `
*[_type=="category" && parent->slug.current == $slug]
| order(coalesce(order,999) asc){
  _id, title, "slug": slug.current
}
`;

const PROJECTS_BY_CAT_QUERY = `
*[_type=="project" && !(_id in path("drafts.**")) && $slug in categories[]->slug.current]
| order(_createdAt desc){
  _id, title, "slug": slug.current, location, year,
  cover{asset->{_id}, alt}
}
`;

export const revalidate = 60;

type Props = {
  // 👇 Next 15: params es Promise
  params: Promise<{ parent: string }>;
  searchParams?: Promise<Record<string, string>>;
};

export default async function Page({ params }: Props) {
  const { parent } = await params; // ← importantísimo

  // 1) Buscar subcategorías del padre
  const subcats = await sanityClient.fetch<Cat[]>(SUBCATS_QUERY, { slug: parent });

  if (subcats.length > 0) {
    return (
      <main className="px-6 py-10">
        <h1 className="mb-6 text-3xl font-semibold">Proyectos</h1>
        <p className="mb-8 text-neutral-600">Elegí una subcategoría.</p>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subcats.map((c) => (
            <li key={c._id}>
              <Link
                href={`/proyectos/${parent}/${c.slug}`}
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

  // 2) Si el "parent" en realidad es una hoja (no tiene subcats), mostrar proyectos
  const projects = await sanityClient.fetch<Proj[]>(PROJECTS_BY_CAT_QUERY, {
    slug: parent,
  });

  return (
    <main className="px-6 py-10">
      <h1 className="mb-6 text-3xl font-semibold">Proyectos</h1>

      {projects.length === 0 ? (
        <p className="text-neutral-600">No hay proyectos para mostrar.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <li key={p._id} className="space-y-2">
              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-neutral-200" />
              <Link href={`/proyectos/${p.slug}`} className="block font-medium">
                {p.title}
              </Link>
              {(p.location || p.year) && (
                <p className="text-sm text-neutral-600">
                  {p.location ?? ""}
                  {p.location && p.year ? " — " : ""}
                  {p.year ?? ""}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
