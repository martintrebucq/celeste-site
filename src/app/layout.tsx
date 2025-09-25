import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "./providers/lenis";
import SidebarNav from "@/components/SidebarNav";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Celeste Di Forte",
  description: "Estudio de interiorismo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased md:pl-56`}>
        <LenisProvider>
          <SidebarNav />
          <div className="min-h-screen">{children}</div>
        </LenisProvider>
      </body>
    </html>
  );
}
