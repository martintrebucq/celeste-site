"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CategoryChips({ cats }: { cats: {title:string; slug:string}[] }) {
  const sp = useSearchParams();
  const active = sp.get("cat");
  const base = "/proyectos";
  return (
    <div className="flex flex-wrap gap-2 px-6">
      <Chip href={base} active={!active}>Todo</Chip>
      {cats.map(c=> <Chip key={c.slug} href={`${base}?cat=${c.slug}`} active={active===c.slug}>{c.title}</Chip>)}
    </div>
  );
}
function Chip({href, active, children}:{href:string; active?:boolean; children:React.ReactNode}) {
  return (
    <Link href={href} className={`px-3 py-1 rounded-full border ${active?"bg-black text-white border-black":"hover:bg-neutral-100"}`}>
      {children}
    </Link>
  );
}
