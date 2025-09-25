// src/sanity/schema.ts
import type { SchemaTypeDefinition, Rule as SanityRule } from "sanity";

/* ------------ helpers de tipos ------------ */
type Rule = SanityRule;
type ParentWithAuto = { autoFeatured?: boolean };
type HiddenCtx = { parent?: ParentWithAuto };

/* ------------------ SETTINGS ------------------ */
const settings: SchemaTypeDefinition = {
  name: "settings",
  title: "Ajustes del sitio",
  type: "document",
  fields: [
    { name: "siteTitle", title: "Título del sitio", type: "string" },
    { name: "logo", title: "Logo", type: "image" },
    {
      name: "emails",
      title: "Emails (max 2)",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule: Rule) => rule.max(2),
    },
    { name: "phone", title: "Teléfono", type: "string" },
    { name: "whatsappNumber", title: "WhatsApp", type: "string" },
    {
      name: "socials",
      title: "Socials",
      type: "object",
      fields: [
        { name: "instagram", type: "url" },
        { name: "linkedin", type: "url" },
        { name: "behance", type: "url" },
      ],
    },
  ],
};

/* ------------------ HOME ------------------ */
const home: SchemaTypeDefinition = {
  name: "home",
  title: "Home",
  type: "document",
  fields: [
    { name: "heroTitle", title: "Título", type: "string" },
    { name: "heroSubtitle", title: "Subtítulo", type: "text" },
    { name: "heroMedia", title: "Imagen/Video", type: "image" },
    { name: "autoFeatured", title: "Destacados automáticos", type: "boolean", initialValue: true },
    {
      name: "featuredProjects",
      title: "Destacados manuales",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      hidden: ({ parent }: HiddenCtx) => parent?.autoFeatured === true,
    },
  ],
};

/* ------------------ CATEGORY ------------------ */
const category: SchemaTypeDefinition = {
  name: "category",
  title: "Categoría",
  type: "document",
  fields: [
    { name: "title", title: "Título", type: "string", validation: (r: Rule) => r.required() },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r: Rule) => r.required(),
    },
    { name: "order", title: "Orden", type: "number" },
    { name: "parent", title: "Categoría madre (opcional)", type: "reference", to: [{ type: "category" }] },
  ],
};

/* ------------------ PLAN / SERVICIO ------------------ */
const plan: SchemaTypeDefinition = {
  name: "plan",
  title: "Plan / Servicio",
  type: "document",
  fields: [
    { name: "title", title: "Título", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "badge", title: "Badge", type: "string" },
    { name: "price", title: "Precio", type: "string" },
    { name: "image", title: "Imagen", type: "image" },
    { name: "description", title: "Descripción", type: "text" },
    { name: "features", title: "Características", type: "array", of: [{ type: "string" }] },
    { name: "ctaLabel", title: "CTA Label", type: "string" },
    { name: "ctaLink", title: "CTA Link", type: "url" },
    { name: "order", title: "Orden", type: "number" },
  ],
};

/* ------------------ CONTACTO ------------------ */
const contact: SchemaTypeDefinition = {
  name: "contact",
  title: "Contacto",
  type: "document",
  fields: [
    { name: "emails", title: "Emails", type: "array", of: [{ type: "string" }] },
    { name: "phone", title: "Teléfono", type: "string" },
    { name: "whatsappNumber", title: "WhatsApp", type: "string" },
    { name: "schedulerEmbed", title: "Embed GHL", type: "text" },
  ],
};

/* ------------------ PROJECT ------------------ */
const project: SchemaTypeDefinition = {
  name: "project",
  title: "Proyecto",
  type: "document",
  fields: [
    { name: "title", title: "Título", type: "string", validation: (r: Rule) => r.required() },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r: Rule) => r.required(),
    },
    { name: "year", title: "Año", type: "number" },
    { name: "client", title: "Cliente", type: "string" },
    { name: "location", title: "Ubicación", type: "string" },
    {
      name: "categories",
      title: "Categorías",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (r: Rule) => r.min(1),
    },
    { name: "excerpt", title: "Resumen", type: "text" },
    { name: "description", title: "Descripción", type: "array", of: [{ type: "block" }] },
    { name: "materials", title: "Materiales", type: "string" },
    { name: "finishes", title: "Terminaciones", type: "string" },
    { name: "dimensions", title: "Dimensiones", type: "string" },
    { name: "areaM2", title: "Área (m²)", type: "number" },
    { name: "providers", title: "Proveedores", type: "array", of: [{ type: "string" }] },
    { name: "team", title: "Equipo", type: "array", of: [{ type: "string" }] },
    { name: "isFeatured", title: "Destacado (Home)", type: "boolean" },
    { name: "priority", title: "Prioridad de destacado", type: "number" },
    {
      name: "cover",
      title: "Cover",
      type: "image",
      fields: [{ name: "alt", title: "Alt", type: "string" }],
    },
    {
      name: "gallery",
      title: "Galería",
      type: "array",
      of: [
        {
          type: "image",
          fields: [
            { name: "alt", title: "Alt", type: "string" },
            { name: "credit", title: "Crédito", type: "string" },
          ],
        },
      ],
    },
    {
      name: "relatedProjects",
      title: "Relacionados",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    },
    { name: "metaTitle", title: "Meta title", type: "string" },
    { name: "metaDescription", title: "Meta description", type: "text" },
    { name: "noindex", title: "No index", type: "boolean" },
  ],
};

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [settings, home, category, plan, contact, project],
};
