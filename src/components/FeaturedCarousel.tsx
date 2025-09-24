"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import type { FeaturedProject } from "@/types/cms";

export default function FeaturedCarousel({ items }: { items: FeaturedProject[] }) {
  if (!items?.length) return null;
  return (
    <div className="px-6">
      <Swiper spaceBetween={24} slidesPerView={1.15} breakpoints={{ 768: { slidesPerView: 2.2 }, 1024: { slidesPerView: 2.6 } }}>
        {items.map((p) => (
          <SwiperSlide key={p._id}>
            <Link href={`/proyectos/${p.slug}`}>
              <div className="rounded-2xl overflow-hidden">
                {p.cover?.asset?._id && (
                  <Image
                    src={urlFor({ asset: { _type: "reference", _ref: p.cover.asset._id } })
                      .width(1600)
                      .height(1000)
                      .url()}
                    alt={p.title}
                    width={1600}
                    height={1000}
                    className="w-full h-auto object-cover"
                  />
                )}
              </div>
              <div className="mt-2 text-sm text-neutral-600">
                {p.title} — {p.location || p.year}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
