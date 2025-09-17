import { defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons";

export default defineType({
  name: "project",
  title: "Proyecto",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: r => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: r => r.required() }),
    defineField({ name: "year", title: "Año", type: "number" }),
    defineField({ name: "client", title: "Cliente", type: "string" }),
    defineField({ name: "location", title: "Ubicación", type: "string" }),
    defineField({ name: "categories", title: "Categorías", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "isFeatured", title: "Destacado (Home)", type: "boolean", initialValue: false }),
    defineField({ name: "priority", title: "Prioridad (orden manual)", type: "number" }),
    defineField({ name: "excerpt", title: "Descripción corta", type: "text", rows: 2 }),
    defineField({ name: "description", title: "Descripción larga", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "cover",
      title: "Portada",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt", type: "string" }],
      validation: r => r.required(),
    }),
    defineField({
      name: "gallery",
      title: "Galería",
      type: "array",
      of: [{
        type: "image",
        options: { hotspot: true },
        fields: [
          { name: "alt", title: "Alt", type: "string" },
          { name: "credit", title: "Crédito/Fotógrafo", type: "string" },
        ]
      }],
    }),
    defineField({ name: "materials", title: "Materiales", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "finishes", title: "Terminaciones", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "dimensions", title: "Dimensiones (texto)", type: "string" }),
    defineField({ name: "areaM2", title: "Área (m²)", type: "number" }),
    defineField({ name: "providers", title: "Proveedores", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "team", title: "Equipo", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "relatedProjects", title: "Relacionados", type: "array", of: [{ type: "reference", to: [{ type: "project" }] }] }),
    // SEO
    defineField({ name: "metaTitle", title: "Meta title", type: "string" }),
    defineField({ name: "metaDescription", title: "Meta description", type: "text", rows: 2 }),
    defineField({ name: "openGraphImage", title: "OG Image", type: "image" }),
    defineField({ name: "noindex", title: "No index", type: "boolean", initialValue: false }),
    defineField({ name: "publishedAt", title: "Publicado", type: "datetime" }),
  ],
  preview: {
    select: { title: "title", media: "cover" },
  },
});
