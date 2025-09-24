import { defineType, defineField } from "sanity";

export default defineType({
  name: "contact",
  title: "Contacto",
  type: "document",
  fields: [
    defineField({ name: "emails", type: "array", of: [{ type: "string" }], title: "Emails" }),
    defineField({ name: "phone", type: "string", title: "Teléfono" }),
    defineField({ name: "whatsappNumber", type: "string", title: "WhatsApp" }),
    defineField({ name: "schedulerEmbed", type: "text", title: "Embed Agenda (GoHighLevel)" }),
  ],
  // Removed invalid 'options' property that caused a type error
});
