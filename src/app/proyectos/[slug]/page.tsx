import { sanityClient } from "@/sanity/client";
import { PROJECT_BY_SLUG } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import Image from "next/image";
import { PortableText } from "next-sanity";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await sanityClient.fetch(`*[_type=="project"]{"slug": slug.current}`);
  return slugs.map(s => ({ slug: s.slug }));
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const data = await sanityClient.fetch(PROJECT_BY_SLUG, { slug: params.slug });

  if (!data) return null;

  return (
    <article className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-8">
        <h1 className="text-4xl font-light">{data.title}</h1>
        <p className="text-neutral-600 mt-2">{data.location} {data.year ? `• ${data.year}` : ""}</p>
      </header>

      {data.cover && (
        <div className="mb-10 rounded-2xl overflow-hidden">
          <Image
            src={urlFor(data.cover).width(1600).height(1000).fit("crop").url()}
            alt={data.cover.alt || data.title}
            width={1600}
            height={1000}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {data.description && (
        <div className="prose prose-neutral max-w-none mb-12">
          <PortableText value={data.description} />
        </div>
      )}

      {Array.isArray(data.gallery) && data.gallery.length > 0 && (
        <section className="grid md:grid-cols-2 gap-6">
          {data.gallery.map((img: any, i: number) => (
            <figure key={i} className="rounded-2xl overflow-hidden">
              <Image
                src={urlFor(img).width(1400).height(900).fit("crop").url()}
                alt={img.alt || `${data.title} ${i+1}`}
                width={1400}
                height={900}
                className="w-full h-auto object-cover"
              />
              {img.credit && <figcaption className="text-xs text-neutral-500 mt-1">{img.credit}</figcaption>}
            </figure>
          ))}
        </section>
      )}
    </article>
  );
}
