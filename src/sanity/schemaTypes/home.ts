import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export default defineType({
  name: "home",
  title: "Home",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({ name: "heroTitle", title: "Hero — Título", type: "string", validation: r => r.required() }),
    defineField({ name: "heroSubtitle", title: "Hero — Subtítulo", type: "text", rows: 2 }),
    defineField({
      name: "heroImage",
      title: "Hero — Imagen",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt", type: "string" }],
    }),
    defineField({
      name: "featured",
      title: "Proyectos destacados",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
    // SEO opcional
    defineField({ name: "metaTitle", title: "Meta title", type: "string" }),
    defineField({ name: "metaDescription", title: "Meta description", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "heroTitle", media: "heroImage" } },
});
