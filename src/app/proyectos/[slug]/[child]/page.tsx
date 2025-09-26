// src/app/proyectos/[slug]/[child]/page.tsx
import Link from "next/link";
import { sanityClient } from "@/sanity/client";

type Proj = {
  _id: string;
  title: string;
  slug: string;
  location?: string;
  year?: number;
  cover?: { asset?: { _id: string }; alt?: string };
};

const PROJECTS_BY_CAT_QUERY = `
*[_type=="project" && !(_id in path("drafts.**")) && $slug in categories[]->slug.current]
| order(_createdAt desc){
  _id, title, "slug": slug.current, location, year,
  cover{asset->{_id}, alt}
}
`;

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string; child: string }>;
  searchParams?: Promise<Record<string, string>>;
};

export default async function ProyectosChildPage({ params }: Props) {
  const { child } = await params;

  const projects = await sanityClient.fetch<Proj[]>(PROJECTS_BY_CAT_QUERY, {
    slug: child,
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
              <Link href={`/proyecto/${p.slug}`} className="block font-medium">
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


