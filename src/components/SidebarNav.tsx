"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Celeste Di Forte" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" },
];

export default function SidebarNav() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:block w-60 shrink-0">
      <div className="sticky top-0 h-screen flex flex-col justify-between py-8 px-6 border-r">
        <nav className="space-y-2">
          {items.map((it) => {
            const active = pathname === it.href;
            return (
              <Link
                key={it.href}
                href={it.href}
                className={`block rounded-lg px-3 py-2 transition ${
                  active ? "bg-black text-white" : "hover:bg-neutral-100"
                }`}
              >
                {it.label}
              </Link>
            );
          })}
        </nav>
        {/* Footer o redes si querés */}
      </div>
    </aside>
  );
}
