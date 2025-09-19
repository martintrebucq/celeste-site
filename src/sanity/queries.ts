// src/sanity/queries.ts
export const FEATURED_PROJECTS = /* groq */ `
*[_type == "project" && !(_id in path("drafts.**")) && isFeatured == true]
| order(coalesce(priority, 0) desc, _createdAt desc)[0...6]{
  _id,
  title,
  "slug": slug.current,
  year,
  location,
  isFeatured,
  priority,
  excerpt,
  cover{asset->{_id}, alt}
}
`;

export const ALL_PROJECTS = /* groq */ `
*[_type == "project" && !(_id in path("drafts.**"))]
| order(coalesce(priority, 0) desc, _createdAt desc){
  _id,
  title,
  "slug": slug.current,
  year,
  location,
  cover{asset->{_id}, alt}
}
`;

export const PROJECT_BY_SLUG = /* groq */ `
*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  year,
  client,
  location,
  categories,
  excerpt,
  description,
  materials,
  finishes,
  dimensions,
  areaM2,
  providers,
  team,
  cover{asset->{_id}, alt},
  gallery[]{asset->{_id}, alt, credit},
  relatedProjects[]->{
    _id,
    title,
    "slug": slug.current,
    year,
    location,
    cover{asset->{_id}, alt}
  },
  // SEO opcional
  metaTitle,
  metaDescription,
  openGraphImage{asset->{_id}},
  noindex
}
`;