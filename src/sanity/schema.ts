import { type SchemaTypeDefinition } from "sanity";
import project from "./schemaTypes/project";
import home from "./schemaTypes/home";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [home, project],
};
