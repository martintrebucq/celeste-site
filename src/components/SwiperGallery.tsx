"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { FC } from "react";

type GalleryItem = {
  asset?: { _id: string; _type: "sanity.imageAsset"; url?: string };
  alt?: string;
  credit?: string;
};

const SwiperGallery: FC<{ items: GalleryItem[]; titleFallback: string }> = ({ items, titleFallback }) => {
  if (!items?.length) return null;

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Keyboard]}
      spaceBetween={16}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      keyboard={{ enabled: true }}
      className="rounded-xl overflow-hidden"
    >
      {items.map((img, idx) => (
        <SwiperSlide key={idx}>
          {img.asset ? (
            <figure>
              <Image
                src={urlFor({ asset: { _type: "reference", _ref: img.asset._id }, alt: img.alt })
                  .width(1600)
                  .height(1100)
                  .fit("crop")
                  .url()}
                alt={img.alt ?? titleFallback}
                width={1600}
                height={1100}
                className="w-full h-auto object-cover"
              />
              {img.credit ? (
                <figcaption className="mt-1 text-xs text-neutral-500 px-2">
                  {img.credit}
                </figcaption>
              ) : null}
            </figure>
          ) : (
            <div className="aspect-[16/10] w-full bg-neutral-200 flex items-center justify-center text-neutral-500">
              Sin imagen
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperGallery;
