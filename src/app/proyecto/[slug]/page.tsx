// REORGANIZACIÓN DE RUTAS NECESARIA:

// ❌ PROBLEMA ACTUAL: 
// /proyectos/[slug]/page.tsx ← puede ser categoría O proyecto individual
// Esto crea ambigüedad

// ✅ SOLUCIÓN - Nueva estructura:
// /proyectos/page.tsx                    ← listado de categorías principales  
// /proyectos/[categoria]/page.tsx        ← proyectos de una categoría O subcategorías
// /proyectos/[categoria]/[sub]/page.tsx  ← proyectos de subcategoría
// /proyecto/[slug]/page.tsx              ← proyecto individual (nueva carpeta)

// 1. CREAR: src/app/proyecto/[slug]/page.tsx
// (Mover el contenido del código anterior aquí)

// 2. ACTUALIZAR: Links en todos los componentes
// Cambiar: href={`/proyectos/${project.slug}`} 
// Por:     href={`/proyecto/${project.slug}`}

// src/app/proyecto/[slug]/page.tsx - PROYECTO INDIVIDUAL
import { sanityClient } from "@/sanity/client";
import { PROJECT_BY_SLUG } from "@/sanity/queries";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import SwiperGallery from "@/components/SwiperGallery";
import { notFound } from "next/navigation";

type ProjectDetail = {
  _id: string;
  title: string;
  slug: string;
  year?: number;
  client?: string;
  location?: string;
  categories?: Array<{
    _id: string;
    title: string;
    slug: string;
    parent?: { slug: string };
  }>;
  excerpt?: string;
  description?: any[];
  materials?: string;
  finishes?: string;
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
  relatedProjects?: Array<{
    _id: string;
    title: string;
    slug: string;
    year?: number;
    location?: string;
    cover?: {
      asset?: { _id: string };
      alt?: string;
    };
  }>;
};

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  
  const project = await sanityClient.fetch<ProjectDetail | null>(
    PROJECT_BY_SLUG, 
    { slug }
  );

  if (!project) {
    notFound();
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-neutral-600 mb-8">
        <Link href="/" className="hover:text-black">Inicio</Link>
        <span>/</span>
        <Link href="/proyectos" className="hover:text-black">Proyectos</Link>
        {project.categories?.[0] && (
          <>
            <span>/</span>
            <Link 
              href={`/proyectos/${project.categories[0].parent?.slug || project.categories[0].slug}`}
              className="hover:text-black"
            >
              {project.categories[0].title}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-black">{project.title}</span>
      </nav>

      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-medium mb-4">{project.title}</h1>
        
        <div className="flex flex-wrap gap-6 text-neutral-600 mb-6">
          {project.location && <span className="flex items-center gap-1">📍 {project.location}</span>}
          {project.year && <span className="flex items-center gap-1">📅 {project.year}</span>}
          {project.client && <span className="flex items-center gap-1">👤 {project.client}</span>}
          {project.areaM2 && <span className="flex items-center gap-1">📏 {project.areaM2}m²</span>}
        </div>

        {project.excerpt && (
          <p className="text-xl leading-relaxed text-neutral-700 max-w-3xl">{project.excerpt}</p>
        )}
      </div>

      {/* Cover Image */}
      {project.cover?.asset && (
        <div className="mb-16 rounded-2xl overflow-hidden">
          <Image
            src={urlFor({ asset: { _type: "reference", _ref: project.cover.asset._id } })
              .width(1600)
              .height(1000)
              .url()}
            alt={project.cover.alt || project.title}
            width={1600}
            height={1000}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="grid lg:grid-cols-4 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Gallery */}
          {project.gallery?.length && (
            <section className="mb-16">
              <h2 className="text-2xl font-medium mb-8">Galería</h2>
              <SwiperGallery items={project.gallery} titleFallback={project.title} />
            </section>
          )}

          {/* Description - Rich Text */}
          {project.description?.length && (
            <section className="mb-16">
              <h2 className="text-2xl font-medium mb-6">Sobre el Proyecto</h2>
              <div className="prose prose-lg prose-neutral max-w-none">
                {/* Para mostrar rich text necesitarías @portabletext/react */}
                <p className="text-neutral-700 leading-relaxed">
                  Descripción detallada del proyecto. Aquí iría el contenido rich-text 
                  de Sanity una vez que implementes PortableText.
                </p>
                <p className="text-sm text-neutral-500 italic">
                  💡 Tip: Instala @portabletext/react para mostrar el contenido completo
                </p>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Project Details */}
          <div className="bg-neutral-50 rounded-xl p-6">
            <h3 className="font-medium mb-4 text-neutral-900">Detalles del Proyecto</h3>
            <div className="space-y-3 text-sm">
              {project.materials && (
                <div>
                  <dt className="font-medium text-neutral-900">Materiales:</dt>
                  <dd className="text-neutral-700">{project.materials}</dd>
                </div>
              )}
              {project.finishes && (
                <div>
                  <dt className="font-medium text-neutral-900">Terminaciones:</dt>
                  <dd className="text-neutral-700">{project.finishes}</dd>
                </div>
              )}
              {project.dimensions && (
                <div>
                  <dt className="font-medium text-neutral-900">Dimensiones:</dt>
                  <dd className="text-neutral-700">{project.dimensions}</dd>
                </div>
              )}
            </div>
          </div>

          {/* Team */}
          {project.team?.length && (
            <div>
              <h3 className="font-medium mb-4">Equipo</h3>
              <ul className="space-y-2">
                {project.team.map((member, i) => (
                  <li key={i} className="text-sm text-neutral-700 flex items-center gap-2">
                    <span className="w-1 h-1 bg-black rounded-full"></span>
                    {member}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Providers */}
          {project.providers?.length && (
            <div>
              <h3 className="font-medium mb-4">Proveedores</h3>
              <ul className="space-y-2">
                {project.providers.map((provider, i) => (
                  <li key={i} className="text-sm text-neutral-700 flex items-center gap-2">
                    <span className="w-1 h-1 bg-black rounded-full"></span>
                    {provider}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Categories */}
          {project.categories?.length && (
            <div>
              <h3 className="font-medium mb-4">Categorías</h3>
              <div className="flex flex-wrap gap-2">
                {project.categories.map((cat) => (
                  <Link
                    key={cat._id}
                    href={`/proyectos/${cat.parent?.slug || cat.slug}`}
                    className="px-3 py-1 text-xs bg-white border rounded-full hover:bg-neutral-50 transition-colors"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-black text-white rounded-xl p-6">
            <h3 className="font-medium mb-2">¿Te gustó este proyecto?</h3>
            <p className="text-sm text-neutral-300 mb-4">
              Hablemos sobre tu próximo espacio
            </p>
            <Link 
              href="/contacto"
              className="inline-block px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-neutral-100 transition-colors"
            >
              Contactar
            </Link>
          </div>
        </aside>
      </div>

      {/* Related Projects */}
      {project.relatedProjects?.length && (
        <section className="mt-20">
          <h2 className="text-2xl font-medium mb-8">Proyectos Relacionados</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {project.relatedProjects.slice(0, 3).map((related) => (
              <article key={related._id} className="group">
                <Link href={`/proyecto/${related.slug}`}>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-200 mb-4">
                    {related.cover?.asset ? (
                      <Image
                        src={urlFor({ asset: { _type: "reference", _ref: related.cover.asset._id } })
                          .width(800)
                          .height(600)
                          .url()}
                        alt={related.cover.alt || related.title}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-500">
                        Sin imagen
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium text-lg group-hover:text-neutral-600 transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-neutral-600">
                    {[related.location, related.year].filter(Boolean).join(" — ")}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}