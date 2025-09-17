import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import { sanityClient } from "@/sanity/client";
import { PROJECT_BY_SLUG } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { PortableText } from "next-sanity";

type RouteParams = { slug: string };

export const revalidate = 60;

// (Opcional) Metadatos dinámicos por slug
export async function generateMetadata(
  { params }: { params: Promise<RouteParams> }
): Promise<Metadata> {
  const { slug } = await params;

  // Si querés armar meta real con datos del proyecto:
  // const project = await sanityClient.fetch(PROJECT_BY_SLUG, { slug });
  // return {
  //   title: project?.metaTitle ?? project?.title ?? `Proyecto: ${slug}`,
  //   description: project?.metaDescription ?? project?.excerpt ?? "",
  // };

  return { title: `Proyecto: ${slug}` };
}

export default async function ProjectPage(
  { params }: { params: Promise<RouteParams> }
) {
  const { slug } = await params;

  const project = await sanityClient.fetch(PROJECT_BY_SLUG, { slug });

  if (!project) {
    return notFound();
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-medium mb-4">{project.title}</h1>

      {project.cover?.asset && (
        <Image
          src={urlFor(project.cover).width(1600).height(900).fit("crop").url()}
          alt={project.cover?.alt ?? project.title}
          width={1600}
          height={900}
          className="w-full h-auto rounded-xl"
        />
      )}

      {project.description && (
        <div className="prose mt-6">
          <PortableText value={project.description} />
        </div>
      )}
    </main>
  );
}

/* 
// (Opcional) Si querés pre-generar páginas estáticas:
import { groq } from "next-sanity";
export async function generateStaticParams(): Promise<RouteParams[]> {
  const slugs = await sanityClient.fetch<string[]>(
    groq`*[_type=="project" && defined(slug.current)][].slug.current`
  );
  return slugs.map((slug) => ({ slug }));
}
*/
