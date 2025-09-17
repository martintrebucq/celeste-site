import { sanityClient } from "@/sanity/client";
import { FEATURED_PROJECTS } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import Link from "next/link";

export const revalidate = 60; // ISR de base

export default async function Home() {
  const projects = await sanityClient.fetch(FEATURED_PROJECTS);

  return (
    <main>
      {/* Hero minimalista */}
      <section className="min-h-[70vh] grid place-items-center text-center">
        <div className="max-w-2xl px-6">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight">Celeste Di Forte</h1>
          <p className="mt-4 text-neutral-600">Muebles de lujo. Diseño y fabricación a medida en [Ciudad/País].</p>
          <div className="mt-6">
            <Link href="/proyectos" className="underline underline-offset-4">Ver proyectos</Link>
          </div>
        </div>
      </section>

      {/* Destacados */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-xl mb-6">Proyectos destacados</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects?.map((p: any) => (
            <Link key={p._id} href={`/proyectos/${p.slug}`} className="group">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={urlFor(p.cover).width(1200).height(900).fit("crop").url()}
                  alt={p.cover?.alt || p.title}
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-2 text-sm text-neutral-600">{p.title} — {p.location || p.year}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
