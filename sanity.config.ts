// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./src/sanity/schema"; // o desde donde lo tengas
import { projectId, dataset } from "./src/sanity/config";

export default defineConfig({
  name: "celeste-studio",
  title: "Celeste Studio",
  projectId,
  dataset,
  plugins: [
    structureTool({ name: "studio", title: "Proyectos" }), // <-- clave
    visionTool(),
  ],
  schema,
});
