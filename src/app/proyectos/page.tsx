// src/app/proyectos/page.tsx
import { sanityClient } from "@/sanity/client";
import { ALL_PROJECTS } from "@/sanity/queries";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

// Si querés permitir filtro por categoría vía ?cat=...
type ProyectosSearch = { cat?: string };

type ProjectCard = {
  _id: string;
  title: string;
  slug: string;
  year?: number;
  location?: string;
  categories?: string[];
  cover?: { asset?: { _id: string }; alt?: string };
};

// helper para armar url de imagen desde el _id (igual que usás en otros lados)
import { urlFor } from "@/sanity/image";
const urlFromId = (id?: string, w = 1200, h = 900) =>
  id
    ? urlFor({ asset: { _type: "reference", _ref: id } })
        .width(w)
        .height(h)
        .fit("crop")
        .url()
    : null;

export default async function ProyectosPage({
  // En Next 15 los props generados son Promise
  searchParams,
}: {
  searchParams: Promise<ProyectosSearch>;
}) {
  const { cat } = await searchParams;

  const all = await sanityClient.fetch<ProjectCard[]>(ALL_PROJECTS);

  const list =
    cat && cat.trim().length
      ? all.filter((p) => (p.categories ?? []).some((c) => c?.toLowerCase() === cat.toLowerCase()))
      : all;

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-medium mb-8">Proyectos</h1>

      {list.length === 0 ? (
        <p className="text-neutral-600">No hay proyectos para mostrar.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {list.map((p) => (
            <Link key={p._id} href={`/proyectos/${p.slug}`} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
                {p.cover?.asset?._id ? (
                  <Image
                    src={urlFromId(p.cover.asset._id, 1200, 900)!}
                    alt={p.cover.alt ?? p.title}
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-neutral-500">
                    Sin imagen
                  </div>
                )}
              </div>
              <div className="mt-2 text-sm text-neutral-600">
                {p.title} — {p.location || p.year}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
