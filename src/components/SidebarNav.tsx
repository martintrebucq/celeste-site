"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

const items = [
  { href: "/", label: "Inicio" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/celeste-di-forte", label: "Celeste Di Forte" }, // crea esta página cuando quieras
  { href: "/contacto", label: "Contacto" },
];

export default function SidebarNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Header solo mobile */}
      <div className="md:hidden sticky top-0 z-50 flex items-center justify-between h-14 px-4 bg-white/80 backdrop-blur border-b">
        <Link href="/" className="font-medium">Celeste Di Forte</Link>
        <button onClick={() => setOpen(v => !v)} aria-label="Abrir menú"><Menu /></button>
      </div>

      {/* Drawer mobile */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`md:hidden fixed top-0 left-0 z-50 h-screen w-64 bg-white shadow transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <nav className="p-6 flex flex-col gap-3">
          {items.map(i => (
            <Link key={i.href} href={i.href} onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:bg-neutral-100">
              {i.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Sidebar desktop */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-56 border-r">
        <nav className="w-full h-full flex flex-col items-center justify-center gap-3">
          {items.map(i => (
            <Link key={i.href} href={i.href} className="px-4 py-2 rounded hover:bg-neutral-100">
              {i.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
