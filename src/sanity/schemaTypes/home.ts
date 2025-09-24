import { defineType, defineField } from "sanity";

export default defineType({
  name: "home",
  title: "Home",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", type: "string", title: "Título Hero" }),
    defineField({ name: "heroSubtitle", type: "text", title: "Subtítulo" }),
    defineField({ name: "heroMedia", type: "image", title: "Imagen/Video Hero" }),
    defineField({ name: "autoFeatured", type: "boolean", title: "Usar proyectos destacados automáticamente", initialValue: true }),
    defineField({
      name: "featuredProjects",
      title: "Proyectos seleccionados (si Auto está apagado)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
  ],
});
