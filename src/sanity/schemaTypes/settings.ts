import { defineType, defineField } from "sanity";

export default defineType({
  name: "settings",
  title: "Ajustes del sitio",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", type: "string", title: "Título del sitio" }),
    defineField({ name: "logo", type: "image", title: "Logo" }),
    defineField({ name: "emails", type: "array", of: [{ type: "string" }], title: "Emails (2 máx.)" }),
    defineField({ name: "phone", type: "string", title: "Teléfono" }),
    defineField({ name: "whatsappNumber", type: "string", title: "WhatsApp (solo números con país)" }),
    defineField({ name: "socials", type: "array", title: "Redes", of: [{ type: "object", fields: [
      { name: "label", type: "string", title: "Label" },
      { name: "url", type: "url", title: "URL" },
    ]}] }),
  ],
  // Removed invalid 'singleton' option to fix lint error
});
