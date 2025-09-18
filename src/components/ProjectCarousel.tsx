"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Keyboard, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";

// el mismo tipo ProjectCard que usás en la home
export type ProjectCard = {
  _id: string;
  title: string;
  slug: string;
  year?: number;
  location?: string;
  excerpt?: string;
  cover?: { asset?: { _type: "reference"; _ref: string }, alt?: string };
};

export default function ProjectCarousel({ projects }: { projects: ProjectCard[] }) {
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, Keyboard, A11y]}
        spaceBetween={16}
        slidesPerView={1.1}
        breakpoints={{ 768: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3 } }}
        navigation
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        // Swiper no rompe Lenis: usa su propio "drag", no el scroll de la página
        className="pb-10"
      >
        {projects.map((p) => (
          <SwiperSlide key={p._id}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="group"
            >
              <Link href={`/proyectos/${p.slug}`}>
                <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                  {p.cover?.asset ? (
                    <Image
                      src={urlFor({
                        asset: { _type: "reference", _ref: p.cover.asset._ref },
                        alt: p.cover.alt,
                      }).width(1200).height(900).fit("crop").url()}
                      alt={p.cover?.alt ?? p.title}
                      width={1200}
                      height={900}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] bg-neutral-100"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-neutral-200 text-neutral-500">
                      Sin imagen
                    </div>
                  )}
                </div>
                <div className="mt-2 text-sm text-neutral-600">
                  {p.title} — {p.location || p.year}
                </div>
              </Link>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
