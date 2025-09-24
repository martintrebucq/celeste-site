import { FadeIn } from "./Animate";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { ImageRef } from "@/types/cms";

export default function Hero({
  title,
  subtitle,
  media,
}: {
  title?: string;
  subtitle?: string;
  media?: ImageRef;
}) {
  const id = media?.asset?._id;
  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] grid place-items-center overflow-hidden">
      {id && (
        <Image
          src={urlFor({ asset: { _type: "reference", _ref: id } })
            .width(2000)
            .height(1200)
            .url()}
          alt={subtitle || title || "Hero"}
          fill
          className="object-cover opacity-40"
          priority
        />
      )}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <h1 className="text-4xl md:text-6xl font-medium">{title}</h1>
        </FadeIn>
        {subtitle && <FadeIn className="mt-4 text-neutral-600">{subtitle}</FadeIn>}
      </div>
    </section>
  );
}
