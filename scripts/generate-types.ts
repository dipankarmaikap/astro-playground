import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getSchema } from "@tiptap/core";
import { defaultExtensions } from "../src/lib/richtext-renderer/core/tiptap-extensions";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getAttributeTypeFromDefault(value: any): string {
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";
  if (typeof value === "string") return "string";
  // If null, we often assume it's a string attribute or any in HTML
  return "any";
}
const extentionObj = defaultExtensions;
const extentionArray = Object.values(extentionObj);

function extractNodeAndMarkAttributes() {
  const schema = getSchema(extentionArray as any);
  let output = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY.\n\n`;
  output += `export interface TiptapNodeAttributes {\n`;

  // Nodes
  for (const [name, nodeType] of Object.entries(schema.nodes)) {
    const attrs = nodeType.spec.attrs;
    console.log([
      {
        nodeType,
        name,
        attrs: JSON.stringify(attrs, null, 2),
      },
    ]);

    if (!attrs || Object.keys(attrs).length === 0) {
      output += `  '${name}': Record<string, never>;\n`;
      continue;
    }
    output += `  '${name}': {\n`;
    for (const [attrName, attrVal] of Object.entries(attrs)) {
      const typeStr = getAttributeTypeFromDefault(attrVal.default);
      output += `    '${attrName}'?: ${typeStr};\n`;
    }
    output += `  };\n`;
  }
  output += `}\n\n`;

  // Marks
  output += `export interface TiptapMarkAttributes {\n`;
  for (const [name, markType] of Object.entries(schema.marks)) {
    const attrs = markType.spec.attrs;
    if (!attrs || Object.keys(attrs).length === 0) {
      output += `  '${name}': Record<string, never>;\n`;
      continue;
    }
    output += `  '${name}': {\n`;
    for (const [attrName, attrVal] of Object.entries(attrs)) {
      const typeStr = getAttributeTypeFromDefault(attrVal.default);
      output += `    '${attrName}'?: ${typeStr};\n`;
    }
    output += `  };\n`;
  }
  output += `}\n\n`;

  output += `export type TiptapAllAttributes = TiptapNodeAttributes & TiptapMarkAttributes;\n`;

  const outPath = path.join(
    __dirname,
    "../src/lib/richtext-renderer/core/generated-types.ts",
  );
  fs.writeFileSync(outPath, output, "utf-8");
  console.log(`✅ Successfully generated Tiptap types at: ${outPath}`);
}

extractNodeAndMarkAttributes();
