// src/app/api/debug-sanity/route.ts
import { NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client";

export async function GET() {
  try {
    const data = await sanityClient.fetch(
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
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
