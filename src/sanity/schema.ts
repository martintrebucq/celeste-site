import { type SchemaTypeDefinition } from "sanity";
import project from "./schemaTypes/project";
import home from "./schemaTypes/home";
import settings from "./schemaTypes/settings";
import contact from "./schemaTypes/contact";
import category from "./schemaTypes/category";
import plan from "./schemaTypes/plan";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [settings, home, category, plan, contact, project],
};
