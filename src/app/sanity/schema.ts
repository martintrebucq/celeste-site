import { type SchemaTypeDefinition } from "sanity";
import project from "./schemaTypes/project";

export const schema: { types: SchemaTypeDefinition[] } = { types: [project] };
