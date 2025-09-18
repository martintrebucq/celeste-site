// src/app/proyectos/[slug]/page.tsx
import type { Metadata } from "next";
import { sanityClient } from "@/sanity/client";
import { PROJECT_BY_SLUG } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "sanity";

export const revalidate = 60;

// Tipos mínimos que usamos en la vista
type ProjectCard = {
  _id: string;
  title: string;
  slug: string;
  year?: number;
  location?: string;
  cover?: {
    asset?: { _id: string };
    alt?: string;
  };
};

type ProjectDetail = {
  _id: string;
  title: string;
  slug: string;
  year?: number;
  client?: string;
  location?: string;
  categories?: string[];
  excerpt?: string;
  description?: PortableTextBlock[];
  materials?: string[];
  finishes?: string[];
  dimensions?: string;
  areaM2?: number;
  providers?: string[];
  team?: string[];
  cover?: {
    asset?: { _id: string };
    alt?: string;
  };
  gallery?: Array<{
    asset?: { _id: string };
    alt?: string;
    credit?: string;
  }>;
  relatedProjects?: ProjectCard[];
  metaTitle?: string;
  metaDescription?: string;
  noindex?: boolean;
};

// Helper para armar URL de imagen desde un _id
const urlFromId = (id?: string, w = 1200, h = 630) =>
  id
    ? urlFor({ asset: { _type: "reference", _ref: id } })
        .width(w)
        .height(h)
        .fit("crop")
        .url()
    : null;

/**
 * SEO dinámico por proyecto
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Pedimos sólo lo necesario para SEO
  const data = await sanityClient.fetch<{
    title?: string;
    slug?: string;
    metaTitle?: string;
    metaDescription?: string;
    excerpt?: string;
    noindex?: boolean;
    openGraphImage?: { asset?: { _id: string } };
    cover?: { asset?: { _id: string } };
  }>(
    `*[_type=="project" && slug.current==$slug][0]{
      title,
      "slug": slug.current,
      metaTitle,
      metaDescription,
      excerpt,
      noindex,
      openGraphImage{asset->{_id}},
      cover{asset->{_id}}
    }`,
    { slug }
  );

  if (!data) {
    return {
      title: "Proyecto no encontrado",
      robots: { index: false, follow: false },
    };
  }

  const title = data.metaTitle || data.title || "Proyecto";
  const description =
    data.metaDescription || data.excerpt || "Proyecto del portfolio.";
  const ogId = data.openGraphImage?.asset?._id || data.cover?.asset?._id;
  const ogUrl = urlFromId(ogId, 1200, 630) || undefined;
  const canonical = `/proyectos/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Celeste Di Forte",
      images: ogUrl
        ? [{ url: ogUrl, width: 1200, height: 630, alt: title }]
        : undefined,
      type: "article",
      locale: "es_AR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogUrl ? [ogUrl] : undefined,
    },
    robots: data.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

// Página de detalle
export default async function ProjectPage({
  // En Next 15, los tipos generados hacen que `params` sea Promise.
  // Usamos la forma compatible para evitar el error del build.
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await sanityClient.fetch<ProjectDetail | null>(
    PROJECT_BY_SLUG,
    { slug }
  );

  if (!project) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-6">
        <Link
          href="/proyectos"
          className="text-sm text-neutral-500 hover:text-neutral-700"
        >
          ← Volver a proyectos
        </Link>
      </div>

      <h1 className="text-3xl font-medium">{project.title}</h1>
      <p className="text-neutral-600 mt-1">
        {[project.location, project.year].filter(Boolean).join(" — ")}
      </p>

      {/* Portada */}
      <div className="mt-6 rounded-2xl overflow-hidden">
        {project.cover?.asset?._id ? (
          <Image
            src={urlFromId(project.cover.asset._id, 1600, 1100)!}
            alt={project.cover?.alt ?? project.title}
            width={1600}
            height={1100}
            className="w-full h-auto object-cover"
            priority
          />
        ) : (
          <div className="aspect-[16/10] w-full bg-neutral-200 flex items-center justify-center text-neutral-500 rounded-2xl">
            Sin imagen
          </div>
        )}
      </div>

      {/* Meta / Ficha */}
      <section className="mt-8 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 prose prose-neutral max-w-none">
          {project.description?.length ? (
            <PortableText value={project.description} />
          ) : project.excerpt ? (
            <p>{project.excerpt}</p>
          ) : (
            <p className="text-neutral-500">Sin descripción.</p>
          )}
        </div>

        <aside className="md:col-span-1">
          <div className="space-y-2 text-sm">
            {project.client && (
              <div>
                <div className="text-neutral-500">Cliente</div>
                <div>{project.client}</div>
              </div>
            )}
            {project.categories?.length ? (
              <div>
                <div className="text-neutral-500">Categorías</div>
                <div>{project.categories.join(", ")}</div>
              </div>
            ) : null}
            {project.materials?.length ? (
              <div>
                <div className="text-neutral-500">Materiales</div>
                <div>{project.materials.join(", ")}</div>
              </div>
            ) : null}
            {project.finishes?.length ? (
              <div>
                <div className="text-neutral-500">Terminaciones</div>
                <div>{project.finishes.join(", ")}</div>
              </div>
            ) : null}
            {project.dimensions && (
              <div>
                <div className="text-neutral-500">Dimensiones</div>
                <div>{project.dimensions}</div>
              </div>
            )}
            {typeof project.areaM2 === "number" && (
              <div>
                <div className="text-neutral-500">Área</div>
                <div>{project.areaM2} m²</div>
              </div>
            )}
            {project.providers?.length ? (
              <div>
                <div className="text-neutral-500">Proveedores</div>
                <div>{project.providers.join(", ")}</div>
              </div>
            ) : null}
            {project.team?.length ? (
              <div>
                <div className="text-neutral-500">Equipo</div>
                <div>{project.team.join(", ")}</div>
              </div>
            ) : null}
          </div>
        </aside>
      </section>

      {/* Galería */}
      {project.gallery?.length ? (
        <section className="mt-10">
          <h2 className="text-xl mb-4">Galería</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {project.gallery.map((img, idx) => (
              <figure key={idx} className="overflow-hidden rounded-xl">
                {img.asset?._id ? (
                  <Image
                    src={urlFromId(img.asset._id, 1200, 900)!}
                    alt={img.alt ?? project.title}
                    width={1200}
                    height={900}
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="aspect-[4/3] w-full bg-neutral-200 flex items-center justify-center text-neutral-500">
                    Sin imagen
                  </div>
                )}
                {img.credit ? (
                  <figcaption className="mt-1 text-xs text-neutral-500">
                    {img.credit}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {/* Relacionados */}
      {project.relatedProjects?.length ? (
        <section className="mt-12">
          <h2 className="text-xl mb-4">Proyectos relacionados</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {project.relatedProjects.map((rp) => (
              <Link key={rp._id} href={`/proyectos/${rp.slug}`} className="group">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                  {rp.cover?.asset?._id ? (
                    <Image
                      src={urlFromId(rp.cover.asset._id, 1200, 900)!}
                      alt={rp.cover?.alt ?? rp.title}
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
                  {rp.title} — {rp.location || rp.year}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
