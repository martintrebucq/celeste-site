// src/app/page.tsx
import { sanityClient } from "@/sanity/client";
import { FEATURED_PROJECTS } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import Link from "next/link";

export const revalidate = 60;

type ProjectCard = {
  _id: string;
  title: string;
  slug: string;
  year?: number;
  location?: string;
  isFeatured?: boolean;
  priority?: number;
  excerpt?: string;
  cover?: {
    asset?: {
      _type: "reference";
      _ref: string;
    };
    alt?: string;
  };
};

export default async function Home() {
  const projects = await sanityClient.fetch<ProjectCard[]>(FEATURED_PROJECTS);

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl mb-8">Celeste Di Forte</h1>

      {projects?.length ? (
        <>
          <h2 className="text-xl mb-4">Proyectos destacados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p: ProjectCard) => (
              <Link key={p._id} href={`/proyectos/${p.slug}`} className="group">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                  {p.cover?.asset ? (
                    <Image
                      src={urlFor(p.cover).width(1200).height(900).fit("crop").url()}
                      alt={p.cover?.alt ?? p.title}
                      width={1200}
                      height={900}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] bg-neutral-100"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-neutral-200 text-neutral-500">
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
        </>
      ) : (
        <p className="text-neutral-500">No hay proyectos destacados todavía.</p>
      )}
    </main>
  );
}
