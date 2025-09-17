import { groq } from "next-sanity";

export const PROJECT_CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  year,
  location,
  isFeatured,
  priority,
  excerpt,
  cover{asset->, alt}
`;

export const ALL_PROJECTS = groq`*[_type=="project"]|order(priority asc, publishedAt desc){${PROJECT_CARD_FIELDS}}`;

export const FEATURED_PROJECTS = groq`*[_type=="project" && isFeatured==true]|order(priority asc){${PROJECT_CARD_FIELDS}}`;

export const PROJECT_BY_SLUG = groq`*[_type=="project" && slug.current==$slug][0]{
  _id, title, "slug": slug.current, year, client, location, categories,
  excerpt, description, materials, finishes, dimensions, areaM2, providers, team,
  cover{asset->, alt},
  gallery[]{asset->, alt, credit},
  relatedProjects[]->{
    ${PROJECT_CARD_FIELDS}
  },
  metaTitle, metaDescription, openGraphImage{asset->}
}`;
