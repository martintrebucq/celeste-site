import { sanityClient } from "@/sanity/client";
import { FEATURED_AUTO, HOME_QUERY } from "@/sanity/queries";
import Hero from "@/components/Hero";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import type { HomeDoc, FeaturedProject } from "@/types/cms";

export const revalidate = 60;

export default async function HomePage() {
  const home = await sanityClient.fetch<HomeDoc>(HOME_QUERY);
  const featured: FeaturedProject[] = home?.autoFeatured
    ? await sanityClient.fetch<FeaturedProject[]>(FEATURED_AUTO)
    : home?.featuredProjects || [];

  return (
    <main className="pb-24">
      <Hero title={home?.heroTitle || "Celeste Di Forte"} subtitle={home?.heroSubtitle} media={home?.heroMedia} />
      <section className="max-w-6xl mx-auto mt-8">
        <h2 className="px-6 mb-4 text-xl">Destacados</h2>
        <FeaturedCarousel items={featured} />
      </section>
    </main>
  );
}
