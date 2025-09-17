import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "./config";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: "published",
});
