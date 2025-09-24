// src/app/api/debug-sanity/route.ts
import { NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client";

export const dynamic = "force-dynamic"; // evita prerender
export const revalidate = 0;            // sin cache para este endpoint

type Row = { _id: string; title?: string; slug?: string };
type FeaturedRow = { title: string; slug: string; priority?: number };

function ok<T>(data: T) {
  return NextResponse.json({
    ok: true,
    data,
    env: {
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    },
  });
}

function fail(message: string, status = 500) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const featured = url.searchParams.get("featured");
    const q = url.searchParams.get("q"); // opcional

    // 2) Modo destacados (misma lógica que Home)
    if (featured === "1") {
      const docs = await sanityClient.fetch<FeaturedRow[]>(
        `*[_type == "project" && isFeatured == true && !(_id in path("drafts.**"))]{
          title,
          "slug": slug.current,
          priority
        } | order(coalesce(priority, 9999) asc, _createdAt desc) [0...6]`
      );
      return ok({
        kind: "featured",
        count: docs.length,
        items: docs,
      });
    }

    // 3) Modo query libre (útil para debug rápido)
    if (q) {
      // Pequeña salvaguarda para evitar queries enormes/peligrosas en prod
      if (q.length > 500) return fail("Query demasiado larga", 400);

      const result = await sanityClient.fetch<unknown>(q);
      return ok({ kind: "custom-groq", q, result });
    }

    // 1) Modo default: sample de 10 docs publicados
    const sample = await sanityClient.fetch<Row[]>(
      `*[_type=="project"]{_id, title, "slug": slug.current}[0...10]`
    );

    return ok({
      kind: "sample",
      count: sample.length,
      items: sample,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : typeof err === "string" ? err : "Unknown error";
    return fail(message);
  }
}
