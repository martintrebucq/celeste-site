import { sanityClient } from "@/sanity/client";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import ProjectCarousel, { type ProjectCard } from "@/components/ProjectCarousel";

// Define the HOME_QUERY inline since the import was missing
const HOME_QUERY = `
  *[_type == "home"][0]{
    heroTitle,
    heroSubtitle,
    heroImage{
      asset->{_id},
      alt
    },
    featured[]->{
      _id,
      title,
      slug,
      coverImage{
        asset->{_id},
        alt
      },
      excerpt
    },
    metaTitle,
    metaDescription
  }
`;

export const revalidate = 60;

type HomeDoc = {
  heroTitle: string;
  heroSubtitle?: string;
  heroImage?: { asset?: { _id: string }, alt?: string };
  featured?: ProjectCard[];
  metaTitle?: string;
  metaDescription?: string;
};

export default async function Home() {
  const data = await sanityClient.fetch<HomeDoc | null>(HOME_QUERY);

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      {data?.heroTitle ? (
        <header className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl mb-2">{data.heroTitle}</h1>
            {data.heroSubtitle ? (
              <p className="text-neutral-600">{data.heroSubtitle}</p>
            ) : null}
          </div>
          {data.heroImage?.asset ? (
            <div className="rounded-2xl overflow-hidden">
              <Image
                src={urlFor({
                  asset: { _type: "reference", _ref: data.heroImage.asset._id },
                  alt: data.heroImage.alt,
                })
                  .width(1400)
                  .height(1000)
                  .fit("crop")
                  .url()}
                alt={data.heroImage.alt ?? data.heroTitle}
                width={1400}
                height={1000}
                className="w-full h-auto object-cover"
              />
            </div>
          ) : null}
        </header>
      ) : (
        <h1 className="text-3xl mb-8">Celeste Di Forte</h1>
      )}

      {data?.featured?.length ? (
        <>
          <h2 className="text-xl mt-12 mb-4">Proyectos destacados</h2>
          <ProjectCarousel projects={data.featured} />
        </>
      ) : null}
    </main>
  );
}
