// src/sanity/schema.ts - SCHEMA CORREGIDO
import type { SchemaTypeDefinition, Rule as SanityRule } from "sanity";

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
      title: "Redes Sociales",
      type: "object",
      fields: [
        { name: "instagram", title: "Instagram", type: "url" },
        { name: "whatsapp", title: "WhatsApp URL", type: "url" },
        { name: "calendly", title: "Link de Agenda", type: "url" },
      ],
    },
  ],
};

/* ------------------ HOME ------------------ */
const home: SchemaTypeDefinition = {
  name: "home",
  title: "Página de Inicio",
  type: "document",
  fields: [
    { name: "heroTitle", title: "Título Principal", type: "string" },
    { name: "heroSubtitle", title: "Subtítulo", type: "text" },
    { name: "heroMedia", title: "Imagen Principal", type: "image" },
    { 
      name: "autoFeatured", 
      title: "Destacados automáticos (por marcador)", 
      type: "boolean", 
      initialValue: true,
      description: "Si está activado, muestra proyectos marcados como destacados"
    },
    {
      name: "featuredProjects",
      title: "Proyectos destacados (selección manual)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      hidden: ({ parent }: HiddenCtx) => parent?.autoFeatured === true,
      description: "Solo se usa si 'Destacados automáticos' está desactivado"
    },
  ],
};

/* ------------------ CATEGORY ------------------ */
const category: SchemaTypeDefinition = {
  name: "category",
  title: "Categoría",
  type: "document",
  fields: [
    { 
      name: "title", 
      title: "Título", 
      type: "string", 
      validation: (r: Rule) => r.required() 
    },
    {
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title" },
      validation: (r: Rule) => r.required(),
    },
    { 
      name: "order", 
      title: "Orden", 
      type: "number",
      description: "Número para ordenar las categorías (menor = primero)"
    },
    { 
      name: "parent", 
      title: "Categoría padre (opcional)", 
      type: "reference", 
      to: [{ type: "category" }],
      description: "Deja vacío para categoría principal"
    },
    {
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 3
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "parent.title"
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title,
        subtitle: subtitle ? `Hijo de: ${subtitle}` : "Categoría principal"
      };
    }
  }
};

/* ------------------ PLAN / SERVICIO ------------------ */
const plan: SchemaTypeDefinition = {
  name: "plan",
  title: "Plan / Servicio",
  type: "document",
  fields: [
    { name: "title", title: "Título", type: "string" },
    { 
      name: "slug", 
      title: "Slug", 
      type: "slug", 
      options: { source: "title" } 
    },
    { 
      name: "badge", 
      title: "Badge (ej: Popular)", 
      type: "string",
      description: "Etiqueta opcional para destacar"
    },
    { name: "price", title: "Precio", type: "string" },
    { name: "image", title: "Imagen", type: "image" },
    { name: "description", title: "Descripción", type: "text", rows: 4 },
    { 
      name: "features", 
      title: "Características", 
      type: "array", 
      of: [{ type: "string" }] 
    },
    { name: "ctaLabel", title: "Texto del botón", type: "string", initialValue: "Consultar" },
    { name: "ctaLink", title: "Link del botón", type: "url" },
    { name: "order", title: "Orden", type: "number" },
  ],
};

/* ------------------ CONTACTO ------------------ */
const contact: SchemaTypeDefinition = {
  name: "contact",
  title: "Información de Contacto",
  type: "document",
  fields: [
    { 
      name: "emails", 
      title: "Emails", 
      type: "array", 
      of: [{ type: "string" }] 
    },
    { name: "phone", title: "Teléfono", type: "string" },
    { name: "whatsappNumber", title: "WhatsApp", type: "string" },
    { 
      name: "schedulerEmbed", 
      title: "Código de agenda (GHL/Calendly)", 
      type: "text",
      description: "Pega aquí el código iframe de tu sistema de agenda"
    },
  ],
};

/* ------------------ PROJECT (CORREGIDO) ------------------ */
const project: SchemaTypeDefinition = {
  name: "project",
  title: "Proyecto",
  type: "document",
  fields: [
    { 
      name: "title", 
      title: "Título", 
      type: "string", 
      validation: (r: Rule) => r.required() 
    },
    {
      name: "slug",
      title: "Slug (URL)",
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
      of: [{ type: "reference", to: [{ type: "category" }] }], // ✅ CORREGIDO: era string[]
      validation: (r: Rule) => r.min(1).error("Selecciona al menos una categoría"),
    },
    { name: "excerpt", title: "Resumen corto", type: "text", rows: 2 },
    { 
      name: "description", 
      title: "Descripción completa", 
      type: "array", 
      of: [{ type: "block" }] 
    },
    { name: "materials", title: "Materiales", type: "string" },
    { name: "finishes", title: "Terminaciones", type: "string" },
    { name: "dimensions", title: "Dimensiones", type: "string" },
    { name: "areaM2", title: "Área (m²)", type: "number" },
    { 
      name: "providers", 
      title: "Proveedores", 
      type: "array", 
      of: [{ type: "string" }] 
    },
    { 
      name: "team", 
      title: "Equipo", 
      type: "array", 
      of: [{ type: "string" }] 
    },
    { 
      name: "isFeatured", 
      title: "Proyecto destacado (aparece en Home)", 
      type: "boolean",
      description: "Marca esto para que aparezca en la página principal"
    },
    { 
      name: "priority", 
      title: "Prioridad (orden de destacados)", 
      type: "number",
      description: "Número menor = aparece primero"
    },
    {
      name: "cover",
      title: "Imagen de portada",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
      validation: (r: Rule) => r.required()
    },
    {
      name: "gallery",
      title: "Galería de imágenes",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Texto alternativo", type: "string" },
            { name: "credit", title: "Crédito fotográfico", type: "string" },
          ],
        },
      ],
    },
    {
      name: "relatedProjects",
      title: "Proyectos relacionados",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    },
    // SEO
    { name: "metaTitle", title: "Meta título (SEO)", type: "string" },
    { name: "metaDescription", title: "Meta descripción (SEO)", type: "text" },
    { name: "noindex", title: "No indexar (SEO)", type: "boolean" },
  ],
  preview: {
    select: {
      title: "title",
      media: "cover",
      subtitle: "location"
    }
  }
};

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [settings, home, category, plan, contact, project],
};