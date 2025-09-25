import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "./providers/lenis";
import SidebarNav from "@/components/SidebarNav";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Celeste Di Forte",
  description: "Interiorismo y proyectos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LenisProvider>
          <div className="flex">
            {/* Menú lateral fijo */}
            <aside className="sticky top-0 h-screen w-56 shrink-0 border-r bg-white">
              <SidebarNav />
            </aside>
            {/* Contenido */}
            <main className="flex-1 min-h-screen">{children}</main>
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}