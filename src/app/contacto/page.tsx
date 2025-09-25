// src/app/contacto/page.tsx
export default async function ContactoPage() {
  // si ya tenés estos datos en Sanity, dejá tus fetch; esto es solo ejemplo
  const email = "ventas@celestediforte.com";
  const whatsapp = "3512048870";
  const ghlEmbed = `<iframe src="TU_URL_DE_GHL" style="width:100%;height:100%;border:0;"></iframe>`;

  return (
    <main className="px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6">Contacto</h1>

      <div className="space-y-3 mb-10">
        <a className="text-blue-600 underline" href={`mailto:${email}`}>{email}</a>
        <div>Tel: <a className="underline" href={`https://wa.me/${whatsapp}`} target="_blank">+{whatsapp}</a></div>
      </div>

      <div className="w-full rounded-lg border overflow-hidden">
        {/* contenedor responsive con altura mínima razonable */}
        <div className="w-full min-h-[520px]" dangerouslySetInnerHTML={{ __html: ghlEmbed }} />
      </div>
    </main>
  );
}
