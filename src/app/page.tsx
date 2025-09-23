// src/app/page.tsx
import { sanityClient } from "@/sanity/client";
import { FEATURED_PROJECTS } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import ProjectCarousel, { type ProjectCard } from "@/components/ProjectCarousel";

export const revalidate = 60;

export default async function Home() {
  // Traemos destacados directamente (sin documento "home")
  const projects = await sanityClient.fetch<ProjectCard[]>(FEATURED_PROJECTS);

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl mb-8">Celeste Di Forte</h1>

      {projects?.length ? (
        <>
          <h2 className="text-xl mb-4">Proyectos destacados</h2>
          <ProjectCarousel projects={projects} />
        </>
      ) : (
        <p className="text-neutral-500">No hay proyectos destacados todavía.</p>
      )}
    </main>
  );
}
