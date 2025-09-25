import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-08-01",
  useCdn: false,           // dataset privado ⇒ CDN no aplica
  perspective: "published",
  token: process.env.SANITY_API_READ_TOKEN,
});