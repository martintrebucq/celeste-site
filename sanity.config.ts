// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./src/sanity/schema";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "celeste-studio",
  title: "Celeste Di Forte Studio",
  projectId,
  dataset,
  basePath: "/studio", // Esto es clave para que funcione en /studio
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenido")
          .items([
            // Singletons primero
            S.listItem()
              .title("🏠 Home")
              .child(S.document().schemaType("home").documentId("home")),
            S.listItem()
              .title("⚙️ Configuración")
              .child(S.document().schemaType("settings").documentId("settings")),
            S.listItem()
              .title("📞 Contacto")
              .child(S.document().schemaType("contact").documentId("contact")),
            S.divider(),
            // Colecciones
            S.listItem()
              .title("🎨 Proyectos")
              .child(S.documentTypeList("project").title("Proyectos")),
            S.listItem()
              .title("📁 Categorías")
              .child(S.documentTypeList("category").title("Categorías")),
            S.listItem()
              .title("💼 Planes & Servicios")
              .child(S.documentTypeList("plan").title("Planes")),
          ]),
    }),
    visionTool(),
  ],
  schema,
});