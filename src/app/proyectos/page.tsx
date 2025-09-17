import { sanityClient } from "@/sanity/client";
import { ALL_PROJECTS } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import Link from "next/link";

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await sanityClient.fetch(ALL_PROJECTS);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl mb-8">Proyectos</h1>
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
    </div>
  );
}
