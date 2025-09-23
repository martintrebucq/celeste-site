// src/app/api/revalidate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

function getRuntimeSecret() {
  // admite cualquiera de las dos ENV
  return process.env.SANITY_REVALIDATE_SECRET || process.env.REVALIDATE_SECRET || "";
}

function getIncomingSecret(req: NextRequest) {
  // admite query ?secret=... o header x-revalidate-secret
  return (
    req.nextUrl.searchParams.get("secret") ||
    req.headers.get("x-revalidate-secret") ||
    ""
  );
}

type MinimalPayload = { slug?: string; type?: string; op?: string };
type SanityDoc = { slug?: { current?: string } };
type DefaultPayload = {
  _type?: string;
  ids?: { created?: string[]; updated?: string[]; deleted?: string[] };
  draft?: SanityDoc;
  published?: SanityDoc;
};
type WebhookBody = MinimalPayload | DefaultPayload;

function extractSlug(body?: WebhookBody): string | undefined {
  if (!body) return;
  const m = body as MinimalPayload;
  if (typeof m.slug === "string") return m.slug;

  const d = body as DefaultPayload;
  const p = d.published?.slug?.current;
  const dr = d.draft?.slug?.current;
  if (typeof p === "string") return p;
  if (typeof dr === "string") return dr;
}

export async function POST(req: NextRequest) {
  // 1) validar secreto
  const runtimeSecret = getRuntimeSecret();
  const incoming = getIncomingSecret(req);
  if (!runtimeSecret || incoming !== runtimeSecret) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  // 2) body es opcional
  let body: WebhookBody | undefined;
  try {
    body = (await req.json()) as WebhookBody;
  } catch {}

  const slug = extractSlug(body);

  // 3) revalidaciones base (home + índice de proyectos + tag cacheada)
  revalidatePath("/");
  revalidatePath("/proyectos");
  revalidateTag("projects");

  // 4) revalidación puntual si vino slug
  if (slug) revalidatePath(`/proyectos/${slug}`);

  return NextResponse.json({
    revalidated: true,
    targeted: slug ?? null,
    ts: Date.now(),
  });
}

// opcional para debug rápido con GET
export async function GET() {
  return NextResponse.json({ ok: true, expecting: ["POST", "secret"] });
}
