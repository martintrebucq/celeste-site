import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  // Revalidamos listados y home
  revalidatePath("/"); 
  revalidatePath("/proyectos");
  revalidateTag("projects");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
