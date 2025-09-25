// src/components/SidebarNav.tsx - MEJORADO
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Instagram, MessageCircle, Calendar } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Inicio" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/celeste-di-forte", label: "Celeste Di Forte" },
  { href: "/contacto", label: "Contacto" },
];

// Links sociales - Celeste puede editarlos desde Sanity
const socialLinks = [
  {
    href: "https://instagram.com/celestediforte", // ← editable desde Sanity
    icon: Instagram,
    label: "Instagram",
    color: "hover:text-pink-500"
  },
  {
    href: "https://wa.me/543512048870", // ← editable desde Sanity  
    icon: MessageCircle,
    label: "WhatsApp",
    color: "hover:text-green-500"
  },
  {
    href: "https://tu-link-de-ghl.com", // ← editable desde Sanity
    icon: Calendar,
    label: "Agendar Cita",
    color: "hover:text-blue-500"
  },
];

export default function SidebarNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Header Mobile */}
      <div className="md:hidden sticky top-0 z-50 flex items-center justify-between h-16 px-4 bg-white/90 backdrop-blur border-b border-neutral-200">
        <Link href="/" className="text-lg font-medium">
          Celeste Di Forte
        </Link>
        <button 
          onClick={() => setOpen(v => !v)} 
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Overlay Mobile */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      
      {/* Drawer Mobile */}
      <aside
        className={`md:hidden fixed top-0 left-0 z-50 h-screen w-80 bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header del drawer */}
          <div className="p-6 border-b border-neutral-100">
            <Link href="/" onClick={() => setOpen(false)} className="text-xl font-medium">
              Celeste Di Forte
            </Link>
            <p className="text-sm text-neutral-600 mt-1">Estudio de Interiorismo</p>
          </div>

          {/* Navegación */}
          <nav className="flex-1 p-6">
            <ul className="space-y-1">
              {items.map(item => {
                const isActive = pathname === item.href || 
                  (item.href !== "/" && pathname.startsWith(item.href));
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                        isActive 
                          ? "bg-black text-white" 
                          : "text-neutral-700 hover:bg-neutral-100 hover:text-black"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Redes sociales */}
          <div className="p-6 border-t border-neutral-100">
            <p className="text-xs text-neutral-500 mb-4 font-medium uppercase tracking-wide">
              Conectá conmigo
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-neutral-100 rounded-xl transition-all ${social.color} hover:scale-110`}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Sidebar Desktop */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-neutral-200">
        <div className="w-full h-full flex flex-col">
          {/* Logo/Brand */}
          <div className="p-8 border-b border-neutral-100">
            <Link href="/" className="block">
              <h1 className="text-xl font-medium">Celeste Di Forte</h1>
              <p className="text-sm text-neutral-600 mt-1">Estudio de Interiorismo</p>
            </Link>
          </div>

          {/* Navegación principal */}
          <nav className="flex-1 p-6">
            <ul className="space-y-2">
              {items.map(item => {
                const isActive = pathname === item.href || 
                  (item.href !== "/" && pathname.startsWith(item.href));
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-4 py-3 rounded-xl font-medium transition-all ${
                        isActive 
                          ? "bg-black text-white shadow-lg" 
                          : "text-neutral-700 hover:bg-neutral-100 hover:text-black"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer con redes */}
          <div className="p-6 border-t border-neutral-100">
            <p className="text-xs text-neutral-500 mb-4 font-medium uppercase tracking-wide">
              Seguime en
            </p>
            <div className="grid grid-cols-3 gap-2">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-neutral-50 rounded-lg transition-all text-center ${social.color} hover:bg-neutral-100 hover:scale-105`}
                  aria-label={social.label}
                >
                  <social.icon size={18} className="mx-auto" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}