import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getSchema } from "@tiptap/core";
import { defaultExtensions } from "../src/lib/richtext-renderer/core/tiptap-extensions";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extensions = Object.values(defaultExtensions);

/**
 * Infer type from default value
 */
function getAttributeTypeFromDefault(value: unknown): string {
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";
  if (typeof value === "string") return "string";
  if (value === null) return "null";
  return "any";
}

/**
 * Fallback typing for required attributes (no default)
 */
function inferRequiredType(attrName: string): string {
  if (["src", "href", "alt", "title", "linktype"].includes(attrName))
    return "string";
  if (["level"].includes(attrName)) return "number";
  return "any";
}

/**
 * Generate attribute interface body for nodes or marks
 */
function generateAttributes(types: Record<string, any>) {
  let out = "";

  for (const [name, type] of Object.entries(types)) {
    const attrs = type.attrs;

    if (!attrs || Object.keys(attrs).length === 0) {
      out += `  '${name}': Record<string, never>;\n`;
      continue;
    }

    out += `  '${name}': {\n`;

    for (const [attrName, attrVal] of Object.entries(attrs)) {
      const attribute: any = attrVal;

      const hasDefault = attribute.hasDefault;
      const defaultValue = attribute.default;
      const isRequired = attribute.isRequired;

      let typeStr: string;

      if (hasDefault) {
        typeStr = getAttributeTypeFromDefault(defaultValue);
      } else {
        typeStr = inferRequiredType(attrName);
      }

      const optional = hasDefault && !isRequired;

      out += `    '${attrName}'${optional ? "?" : ""}: ${typeStr};\n`;
    }

    out += `  };\n`;
  }

  return out;
}

function generateTypes() {
  const schema = getSchema(extensions as any);

  let output = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.\n\n`;

  /**
   * Node attributes
   */
  output += `export interface TiptapNodeAttributes {\n`;
  output += generateAttributes(schema.nodes);
  output += `}\n\n`;

  /**
   * Mark attributes
   */
  output += `export interface TiptapMarkAttributes {\n`;
  output += generateAttributes(schema.marks);
  output += `}\n\n`;

  /**
   * Helper types
   */
  output += `export type TiptapNodeName = keyof TiptapNodeAttributes;\n`;
  output += `export type TiptapMarkName = keyof TiptapMarkAttributes;\n\n`;

  output += `export type TiptapAllAttributes = TiptapNodeAttributes & TiptapMarkAttributes;\n`;

  const outPath = path.join(
    __dirname,
    "../src/lib/richtext-renderer/core/tiptap-schema.generated.ts",
  );

  fs.writeFileSync(outPath, output, "utf-8");

  console.log("Generated Tiptap schema types:");
  console.table({
    nodes: Object.keys(schema.nodes).length,
    marks: Object.keys(schema.marks).length,
    output: outPath,
  });
}

generateTypes();
