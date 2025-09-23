// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { sanityClient } from "@/sanity/client";
import { FEATURED_PROJECTS } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

export const revalidate = 60; // ISR

type Card = {
  _id: string;
  title: string;
  slug: string;
  year?: number;
  location?: string;
  excerpt?: string;
  cover?: { asset?: { _id: string }; alt?: string };
};

export default async function HomePage() {
  // OJO: le damos una tag de caché "projects" y "home" para poder invalidar fácil.
  const featured = await sanityClient.fetch<Card[]>(
    FEATURED_PROJECTS,
    {},
    { next: { tags: ["projects", "home"] } }
  );

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-medium">Celeste Di Forte</h1>

      {!featured?.length && (
        <p className="text-neutral-600 mt-3">
          No hay proyectos destacados todavía.
        </p>
      )}

      {!!featured?.length && (
        <>
          <h2 className="text-xl mt-8 mb-4">Destacados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((p) => (
              <Link key={p._id} href={`/proyectos/${p.slug}`} className="group">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
                  {p.cover?.asset?._id ? (
                    <Image
                      src={urlFor({
                        asset: { _type: "reference", _ref: p.cover.asset._id },
                        alt: p.cover.alt,
                      })
                        .width(1200)
                        .height(900)
                        .fit("crop")
                        .url()}
                      alt={p.cover?.alt ?? p.title}
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
                  {p.title} {p.location ? `— ${p.location}` : p.year ? `— ${p.year}` : ""}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
