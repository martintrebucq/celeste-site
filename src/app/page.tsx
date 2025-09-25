// src/app/page.tsx
import Link from "next/link";
import { sanityClient } from "@/sanity/client";
import { HOME_QUERY, FEATURED_AUTO } from "@/sanity/queries";

type Card = {
  _id: string;
  title: string;
  slug: string;
  location?: string;
  year?: number;
  cover?: { asset?: { _id: string }; alt?: string };
};

type HomeDoc = {
  autoFeatured?: boolean;
  featuredProjects?: unknown[]; // viene heterogéneo desde Sanity
};

// type guard para evitar any
function isCard(x: unknown): x is Card {
  if (typeof x !== "object" || x === null) return false;
  const obj = x as Record<string, unknown>;
  return (
    typeof obj._id === "string" &&
    typeof obj.title === "string" &&
    typeof obj.slug === "string"
  );
}

export default async function HomePage() {
  const home = (await sanityClient.fetch(HOME_QUERY)) as HomeDoc | null;

  let rawFeatured: unknown[] = [];
  if (home?.autoFeatured) {
    // la query ya devuelve la forma de Card[]
    rawFeatured = (await sanityClient.fetch(FEATURED_AUTO)) as unknown[];
  } else if (Array.isArray(home?.featuredProjects)) {
    rawFeatured = home!.featuredProjects;
  }

  // saneamos: fuera nulls y elementos sin slug
  const featured: Card[] = rawFeatured.filter(isCard);

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-semibold mb-8">Celeste Di Forte</h1>

      <section>
        <h2 className="text-xl font-medium mb-4">Destacados</h2>

        {featured.length === 0 ? (
          <p className="text-neutral-500">No hay proyectos destacados todavía.</p>
        ) : (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <li key={p._id} className="space-y-2">
                <div className="aspect-[4/3] rounded-lg bg-neutral-200 overflow-hidden" />
                <Link href={`/proyectos/${p.slug}`} className="block font-medium">
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
      </section>
    </main>
  );
}