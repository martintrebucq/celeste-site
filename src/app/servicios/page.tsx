import { sanityClient } from "@/sanity/client";
import { PLANS_ALL } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { PlanDoc } from "@/types/cms";

export const revalidate = 60;

export default async function ServicesPage() {
  const plans = await sanityClient.fetch<PlanDoc[]>(PLANS_ALL);
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-medium mb-6">Planes y servicios</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((pl) => (
          <article key={pl._id} className="rounded-2xl border overflow-hidden">
            {pl.image?.asset?._id && (
              <Image
                src={urlFor({ asset: { _type: "reference", _ref: pl.image.asset._id } })
                  .width(1200)
                  .height(800)
                  .url()}
                alt={pl.title}
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
              />
            )}
            <div className="p-5">
              {pl.badge && (
                <div className="text-xs inline-block px-2 py-1 rounded-full bg-black text-white mb-2">{pl.badge}</div>
              )}
              <h3 className="text-lg font-medium">{pl.title}</h3>
              {pl.price && <div className="mt-1 text-neutral-600">{pl.price}</div>}
              {pl.description && <p className="mt-3 text-sm text-neutral-600">{pl.description}</p>}
              {pl.features?.length ? (
                <ul className="mt-3 space-y-1 text-sm">
                  {pl.features.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              ) : null}
              {pl.ctaLink && (
                <a href={pl.ctaLink} target="_blank" className="mt-4 inline-block px-4 py-2 rounded-full bg-black text-white">
                  {pl.ctaLabel || "Consultar"}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
