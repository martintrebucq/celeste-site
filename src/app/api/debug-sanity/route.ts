// src/app/api/debug-sanity/route.ts
import { NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client";

// Para que el endpoint no se intente prerender: siempre dinámico
export const dynamic = "force-dynamic";

type Row = { _id: string; title?: string; slug?: string };

export async function GET() {
  try {
    const data = await sanityClient.fetch<Row[]>(
      `*[_type=="project"]{_id, title, "slug": slug.current}[0...10]`
    );

    return NextResponse.json({
      ok: true,
      count: Array.isArray(data) ? data.length : 0,
      sample: data,
      env: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
      },
    });
  } catch (err: unknown) {
    // ¡Sin `any`!
    const message =
      err instanceof Error
        ? err.message
        : typeof err === "string"
        ? err
        : "Unknown error";

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
