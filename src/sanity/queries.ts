// ------------- Settings / Home / Contact -------------
export const SETTINGS_QUERY = /* groq */ `
*[_type=="settings"][0]{siteTitle, logo, emails, phone, whatsappNumber, socials}
`;

export const HOME_QUERY = /* groq */ `
*[_type=="home"][0]{
  heroTitle, heroSubtitle, heroMedia,
  autoFeatured,
  featuredProjects[]->{
    _id, title, "slug": slug.current, location, year,
    cover{asset->{_id}, alt}
  }
}
`;

export const CONTACT_QUERY = /* groq */ `
*[_type=="contact"][0]{emails, phone, whatsappNumber, schedulerEmbed}
`;

// ------------- Categorías -------------
export const CATEGORIES_TOP = /* groq */ `
*[_type=="category" && !defined(parent)] | order(coalesce(order,999) asc) {
  _id, title, "slug": slug.current
}
`;

export const CATEGORIES_CHILDREN = /* groq */ `
*[_type=="category" && parent->slug.current == $parentSlug] | order(coalesce(order,999) asc) {
  _id, title, "slug": slug.current
}
`;

// ------------- Proyectos -------------

export const ALL_PROJECTS = /* groq */ `
[_type == "project" && !(_id in path("drafts.*"))] 
| order(_createdAt desc) {
  _id, title, "slug": slug.current, year, location, excerpt, isFeatured, priority,
  cover { asset->{_id}, alt }
}
`;

export const FEATURED_AUTO = /* groq */ `
[_type=="project" && isFeatured==true && !(_id in path("drafts.*"))] 
| order(coalesce(priority,9999) asc, _createdAt desc) [0...6]{
  _id, title, "slug": slug.current, location, year, cover{asset->{_id}, alt}
}
`;

// Proyectos cuyo category es el top-level $slug o cualquiera de sus hijos
export const PROJECTS_BY_CATEGORY = /* groq */ `
[_type=="project" && !(_id in path("drafts.*")) &&
  references(
    *[_type=="category" && (slug.current == $slug || parent->slug.current == $slug)]._id
  )
] | order(_createdAt desc){
  _id, title, "slug": slug.current, year, location, excerpt,
  cover{asset->{_id}, alt}
}
`;

export const PROJECT_BY_SLUG = /* groq */ `
*[_type == "project" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, year, client, location,
  categories[]->{_id, title, "slug": slug.current, parent->{ "slug": slug.current }},
  excerpt, description, materials, finishes, dimensions, areaM2,
  providers, team,
  cover{ asset->{_id}, alt },
  gallery[]{ asset->{_id}, alt, credit },
  relatedProjects[]->{
    _id, title, "slug": slug.current, year, location,
    cover{ asset->{_id}, alt }
  },
  metaTitle, metaDescription, noindex
}
`;
// --- Planes / Servicios ---
export const PLANS_ALL = /* groq */ `
*[_type=="plan"] | order(coalesce(order,999) asc) {
  _id,
  title,
  "slug": slug.current,
  badge,
  price,
  image{asset->{_id}},
  description,
  features,
  ctaLabel,
  ctaLink
}
`;
export const PARENT_CATEGORIES = /* groq */ `
*[_type=="category" && !defined(parent)]
| order(coalesce(order, 999) asc) {
  _id, title, "slug": slug.current
}
`;

export const CHILD_CATEGORIES_BY_PARENT = /* groq */ `
*[_type=="category" && parent->slug.current==$parent]
| order(coalesce(order, 999) asc) {
  _id, title, "slug": slug.current
}
`;

export const PROJECTS_BY_CHILD = /* groq */ `
*[_type=="project" && !(_id in path("drafts.**")) && $child in categories[]->slug.current]
| order(_createdAt desc) {
  _id, title, "slug": slug.current, year, location, excerpt,
  cover{asset->{_id}, alt}
}
`;
