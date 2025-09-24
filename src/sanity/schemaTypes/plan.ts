import { defineType, defineField } from "sanity";

export default defineType({
  name: "plan",
  title: "Plan / Servicio",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Título" }),
    defineField({ name: "slug", type: "slug", title: "Slug", options: { source: "title" } }),
    defineField({ name: "badge", type: "string", title: "Badge (opcional)" }),
    defineField({ name: "price", type: "string", title: "Precio/desde (texto)" }),
    defineField({ name: "image", type: "image", title: "Imagen" }),
    defineField({ name: "description", type: "text", title: "Descripción corta" }),
    defineField({ name: "features", type: "array", title: "Características", of: [{ type: "string" }] }),
    defineField({ name: "ctaLabel", type: "string", title: "CTA Label", initialValue: "Consultar" }),
    defineField({ name: "ctaLink", type: "url", title: "CTA Link (WhatsApp o Contacto)" }),
    defineField({ name: "order", type: "number", title: "Orden" }),
  ],
});
