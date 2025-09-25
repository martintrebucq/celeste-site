// src/app/proyectos/[slug]/page.tsx
import { sanityClient } from "@/sanity/client";
import { PROJECTS_BY_CATEGORY } from "@/sanity/queries";
import Link from "next/link";

type Params = { slug: string };

type ImageAssetRef = { _id: string };
type ImageRef = { asset?: ImageAssetRef | null; alt?: string | null };

type ProjectCard = {
  _id: string;
  title: string;
  slug: string;
  location?: string | null;
  year?: number | null;
  cover?: ImageRef | null;
};

export default async function ProjectsByCategoryPage({
  params,
}: {
  // En Next 15 los tipos generados pueden hacer que params sea Promise
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const projects = await sanityClient.fetch<ProjectCard[]>(
    PROJECTS_BY_CATEGORY,
    { cat: slug } // <- tu GROQ usa $cat
  );

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6 capitalize">
        {slug.replaceAll("-", " ")}
      </h1>

      {projects.length === 0 ? (
        <p className="text-neutral-500">No hay proyectos para mostrar.</p>
      ) : (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <li key={p._id} className="space-y-2">
              <div className="aspect-[4/3] rounded-lg bg-neutral-200 overflow-hidden" />
              <Link href={`/proyectos/${p.slug}`} className="block font-medium">
                {p.title}
              </Link>
              {(p.location || p.year) && (
                <p className="text-sm text-neutral-600">
                  {p.location ?? ""} {p.location && p.year ? "—" : ""} {p.year ?? ""}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}