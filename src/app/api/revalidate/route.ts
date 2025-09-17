import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// Payload “minimal” (si usás Projection con { slug, type, op })
type MinimalPayload = {
  slug?: string;
  type?: string;
  op?: string;
};

// Payload “default” de Sanity con includeDocument
type SanityDocSlug = { current?: string };
type SanityDoc = { slug?: SanityDocSlug };
type DefaultPayload = {
  _type?: string;
  ids?: { created?: string[]; updated?: string[]; deleted?: string[] };
  draft?: SanityDoc;
  published?: SanityDoc;
};

type WebhookBody = MinimalPayload | DefaultPayload;

function extractSlug(body?: WebhookBody): string | undefined {
  if (!body) return undefined;

  // Caso 1: payload minimal { slug: "..." }
  const maybeMinimal = body as { slug?: unknown };
  if (typeof maybeMinimal.slug === "string") return maybeMinimal.slug;

  // Caso 2: payload default con published/draft.slug.current
  const maybeDefault = body as {
    published?: { slug?: { current?: unknown } };
    draft?: { slug?: { current?: unknown } };
  };

  const pub = maybeDefault.published?.slug?.current;
  if (typeof pub === "string") return pub;

  const dr = maybeDefault.draft?.slug?.current;
  if (typeof dr === "string") return dr;

  return undefined;
}

export async function POST(req: NextRequest) {
  // 1) Secret
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  // 2) Body (puede no venir si no marcaste “Include payload”)
  let body: WebhookBody | undefined;
  try {
    body = (await req.json()) as WebhookBody;
  } catch {
    // sin payload -> seguimos igual con revalidación base
  }

  // 3) Derivar slug (si está disponible)
  const slug = extractSlug(body);

  // 4) Revalidaciones base
  revalidatePath("/"); 
  revalidatePath("/proyectos");
  revalidateTag("projects");

  // 5) Revalidación selectiva por slug
  if (slug) {
    revalidatePath(`/proyectos/${slug}`);
  }

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    targeted: slug ?? null,
  });
}
