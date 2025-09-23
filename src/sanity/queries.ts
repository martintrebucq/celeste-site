// src/sanity/queries.ts
export const ALL_PROJECTS = /* groq */ `
*[_type == "project" && !(_id in path("drafts.**"))] 
| order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  year,
  location,
  excerpt,
  isFeatured,
  priority,
  cover {
    asset->{_id},
    alt
  }
}
`;

export const FEATURED_PROJECTS = /* groq */ `
*[_type == "project" && isFeatured == true && !(_id in path("drafts.**"))]
| order(coalesce(priority, 9999) asc, _createdAt desc) [0...6] {
  _id,
  title,
  "slug": slug.current,
  year,
  location,
  excerpt,
  cover {
    asset->{_id},
    alt
  }
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
  cover{ asset->{_id}, alt },
  gallery[]{ asset->{_id}, alt, credit },
  relatedProjects[]->{
    _id, title, "slug": slug.current, year, location,
    cover{ asset->{_id}, alt }
  },
  metaTitle,
  metaDescription,
  noindex
}
`;
