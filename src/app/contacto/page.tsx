import { sanityClient } from "@/sanity/client";
import { CONTACT_QUERY, SETTINGS_QUERY } from "@/sanity/queries";
import type { ContactDoc, SettingsDoc } from "@/types/cms";

export const revalidate = 60;

function waLink(num?: string) {
  return num ? `https://wa.me/${num}?text=Hola%20Celeste,%20quiero%20hacer%20una%20consulta` : "#";
}

export default async function ContactPage() {
  const [contact, settings] = await Promise.all([
    sanityClient.fetch<ContactDoc>(CONTACT_QUERY),
    sanityClient.fetch<SettingsDoc>(SETTINGS_QUERY),
  ]);

  const emails = contact?.emails?.length ? contact.emails : settings?.emails || [];

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-medium mb-6">Contacto</h1>

      <div className="space-y-2">
        {emails.map((e, i) => (
          <div key={i}>
            <a className="underline" href={`mailto:${e}`}>
              {e}
            </a>
          </div>
        ))}
        {contact?.phone && (
          <div>
            Tel:{" "}
            <a className="underline" href={`tel:${contact.phone}`}>
              {contact.phone}
            </a>
          </div>
        )}
        {(contact?.whatsappNumber || settings?.whatsappNumber) && (
          <div>
            <a
              className="inline-block px-4 py-2 rounded-full bg-black text-white"
              href={waLink(contact?.whatsappNumber || settings?.whatsappNumber)}
              target="_blank"
            >
              WhatsApp
            </a>
          </div>
        )}
      </div>

      {contact?.schedulerEmbed && (
        <div className="mt-8" dangerouslySetInnerHTML={{ __html: contact.schedulerEmbed }} />
      )}
    </main>
  );
}
