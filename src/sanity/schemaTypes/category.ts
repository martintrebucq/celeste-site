import { defineType, defineField } from "sanity";

export default defineType({
  name: "category",
  title: "Categoría",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Título" }),
    defineField({ name: "slug", type: "slug", title: "Slug", options: { source: "title" } }),
    defineField({ name: "order", type: "number", title: "Orden" }),
  ],
});
