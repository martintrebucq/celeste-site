// src/app/celeste-di-forte/page.tsx - CORREGIDO
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { PortableTextBlock } from "sanity";

// Schema About que deberías agregar luego
type AboutDoc = {
  _id: string;
  name: string;
  title: string;
  bio: PortableTextBlock[]; // ✅ Tipo específico en lugar de any[]
  photo?: {
    asset?: { _id: string };
    alt?: string;
  };
  experience: string;
  education?: string[];
  awards?: string[];
  philosophy?: string;
  specialties?: string[];
};

export const revalidate = 60;

export default async function CelesteAboutPage() {
  // Datos temporales mientras no existe el schema "about"
  // Celeste puede editar esto desde Sanity una vez que agregues el schema
  const defaultData: AboutDoc = {
    _id: "temp",
    name: "Celeste Di Forte",
    title: "Diseñadora de Interiores",
    bio: [], // PortableText blocks vacío
    experience: "10+ años",
    education: [
      "Licenciatura en Diseño de Interiores",
      "Especialización en Diseño Sustentable"
    ],
    specialties: [
      "Espacios residenciales",
      "Diseño comercial", 
      "Ambientes sustentables",
      "Proyectos llave en mano"
    ],
    philosophy: "Crear espacios que reflejen la personalidad y necesidades de cada cliente, combinando funcionalidad, estética y sustentabilidad.",
  };

  // Una vez que agregues el schema, descomenta esta línea:
  // const about = await sanityClient.fetch<AboutDoc | null>(ABOUT_QUERY) || defaultData;
  const about = defaultData;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Photo */}
        <div className="order-2 lg:order-1">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-200">
            {about.photo?.asset ? (
              <Image
                src={urlFor({ asset: { _type: "reference", _ref: about.photo.asset._id } })
                  .width(800)
                  .height(1000)
                  .url()}
                alt={about.photo.alt || about.name}
                width={800}
                height={1000}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-500">
                Foto de Celeste
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2 space-y-8">
          <div>
            <h1 className="text-4xl font-medium mb-2">{about.name}</h1>
            <p className="text-xl text-neutral-600 mb-6">{about.title}</p>
            
            <div className="prose prose-neutral">
              <p className="text-lg leading-relaxed">
                {about.philosophy}
              </p>
              
              <p>
                Con más de {about.experience} de experiencia en el diseño de interiores, 
                me especializo en crear espacios únicos que combinan estética, funcionalidad 
                y sustentabilidad.
              </p>
              
              <p>
                Mi enfoque se centra en entender profundamente las necesidades y el estilo 
                de vida de cada cliente para crear ambientes que realmente los representen 
                y les brinden bienestar.
              </p>
            </div>
          </div>

          {/* Especialidades */}
          <div>
            <h2 className="text-xl font-medium mb-4">Especialidades</h2>
            <ul className="grid grid-cols-2 gap-2">
              {about.specialties?.map((specialty, i) => (
                <li key={i} className="flex items-center text-neutral-700">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mr-3"></span>
                  {specialty}
                </li>
              ))}
            </ul>
          </div>

          {/* Educación */}
          {about.education?.length && (
            <div>
              <h2 className="text-xl font-medium mb-4">Formación</h2>
              <ul className="space-y-2">
                {about.education.map((edu, i) => (
                  <li key={i} className="text-neutral-700">• {edu}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Premios */}
          {about.awards?.length && (
            <div>
              <h2 className="text-xl font-medium mb-4">Reconocimientos</h2>
              <ul className="space-y-2">
                {about.awards.map((award, i) => (
                  <li key={i} className="text-neutral-700">• {award}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Call to action */}
          <div className="pt-6 border-t">
            <h3 className="text-lg font-medium mb-3">¿Tenés un proyecto en mente?</h3>
            <p className="text-neutral-600 mb-4">
              Me encantaría conocer tu idea y ayudarte a crear el espacio de tus sueños.
            </p>
            <div className="flex gap-3">
              <a 
                href="/contacto" 
                className="px-6 py-2 bg-black text-white rounded-full hover:bg-neutral-800 transition-colors"
              >
                Contactar
              </a>
              <a 
                href="/servicios" 
                className="px-6 py-2 border border-neutral-300 rounded-full hover:bg-neutral-50 transition-colors"
              >
                Ver Servicios
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}