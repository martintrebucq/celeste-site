// src/app/contacto/page.tsx - COMPLETA
import { sanityClient } from "@/sanity/client";
import { CONTACT_QUERY } from "@/sanity/queries";
import { Mail, Phone, MessageCircle, MapPin, Clock, Calendar } from "lucide-react";

type ContactInfo = {
  emails?: string[];
  phone?: string;
  whatsappNumber?: string;
  schedulerEmbed?: string;
};

export const revalidate = 60;

export default async function ContactPage() {
  // Fetch data from Sanity - fallback to defaults
  const contactData = await sanityClient.fetch<ContactInfo | null>(CONTACT_QUERY);
  
  const contact = {
    emails: contactData?.emails || ["ventas@celestediforte.com"],
    phone: contactData?.phone || "351-204-8870",
    whatsappNumber: contactData?.whatsappNumber || "543512048870",
    schedulerEmbed: contactData?.schedulerEmbed || `
      <iframe src="https://api.leadconnectorhq.com/widget/booking/3NVcibvpbWTElHEHQHhi" 
        style=width: 100%;border:none;overflow: hidden;" scrolling="no" id="3NVcibvpbWTElHEHQHhi_1758899110038">
      </iframe><br>
      <script src="https://link.msgsndr.com/js/form_embed.js" type="text/javascript"></script>
    `,
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-medium mb-4">Hablemos de tu proyecto</h1>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Cada espacio cuenta una historia. Contame la tuya y creemos juntos 
          el ambiente perfecto para vos.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-medium mb-8">Información de contacto</h2>
            
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-100 rounded-xl">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  {contact.emails.map((email, i) => (
                    <a 
                      key={i}
                      href={`mailto:${email}`}
                      className="text-neutral-600 hover:text-black transition-colors block"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>

              {/* Phone */}
              {contact.phone && (
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neutral-100 rounded-xl">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Teléfono</h3>
                    <a 
                      href={`tel:+54${contact.phone.replace(/\D/g, '')}`}
                      className="text-neutral-600 hover:text-black transition-colors"
                    >
                      +54 {contact.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* WhatsApp */}
              {contact.whatsappNumber && (
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <MessageCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">WhatsApp</h3>
                    <a 
                      href={`https://wa.me/${contact.whatsappNumber}`}
                      target="_blank"
                      className="text-neutral-600 hover:text-green-600 transition-colors"
                    >
                      +{contact.whatsappNumber}
                    </a>
                    <p className="text-sm text-neutral-500 mt-1">
                      Respuesta más rápida
                    </p>
                  </div>
                </div>
              )}

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-100 rounded-xl">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Ubicación</h3>
                  <p className="text-neutral-600">
                    La Calera, Córdoba, Argentina
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    También trabajo en Córdoba Capital
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-100 rounded-xl">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Horarios</h3>
                  <div className="text-neutral-600 text-sm space-y-1">
                    <p>Lun - Vie: 9:00 - 18:00</p>
                    <p>Sáb: 9:00 - 13:00</p>
                    <p className="text-neutral-400">Dom: Cerrado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-neutral-50 rounded-2xl p-8">
            <h3 className="text-xl font-medium mb-4">¿Listo para empezar?</h3>
            <p className="text-neutral-600 mb-6">
              Agendá una consulta gratuita y conversemos sobre tu proyecto. 
              Te voy a hacer algunas preguntas para entender mejor tu visión.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href={`https://wa.me/${contact.whatsappNumber}`}
                target="_blank"
                className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
              >
                <MessageCircle size={18} />
                Escribir por WhatsApp
              </a>
              <a 
                href={`mailto:${contact.emails[0]}`}
                className="flex items-center justify-center gap-2 border border-neutral-300 px-6 py-3 rounded-xl hover:bg-neutral-100 transition-colors"
              >
                <Mail size={18} />
                Enviar email
              </a>
            </div>
          </div>
        </div>

        {/* Calendar/Scheduler */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Calendar size={24} />
              <h2 className="text-2xl font-medium">Agendar consulta</h2>
            </div>
            
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
              {contact.schedulerEmbed ? (
                  <div 
                    className="min-h-[600px]"
                    dangerouslySetInnerHTML={{ __html: contact.schedulerEmbed }}
                    />
                
              ) : (
                <div className="p-12 text-center">
                  <Calendar size={48} className="mx-auto mb-4 text-neutral-400" />
                  <h3 className="text-lg font-medium mb-2">Calendario no disponible</h3>
                  <p className="text-neutral-600 mb-6">
                    Por favor, contactame directamente para coordinar una reunión.
                  </p>
                  <a 
                    href={`https://wa.me/${contact.whatsappNumber}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle size={18} />
                    Contactar por WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Process Info */}
          <div className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-8 border border-neutral-100">
            <h3 className="text-xl font-medium mb-6">¿Cómo trabajamos?</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium mb-1">Consulta inicial</h4>
                  <p className="text-sm text-neutral-600">
                    Hablamos de tu proyecto, necesidades y presupuesto.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium mb-1">Propuesta</h4>
                  <p className="text-sm text-neutral-600">
                    Te presento ideas, mood boards y cotización detallada.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-medium mb-1">Ejecución</h4>
                  <p className="text-sm text-neutral-600">
                    Llevamos a cabo el proyecto con seguimiento constante.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}