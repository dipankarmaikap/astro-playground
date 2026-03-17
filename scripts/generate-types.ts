import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getSchema } from "@tiptap/core";
import { defaultExtensions } from "../src/lib/richtext-renderer/core/tiptap-extensions";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extensions = Object.values(defaultExtensions);

/**
 * Type hints registry for common attribute patterns.
 * These provide more specific types than inference from default values.
 */
const ATTRIBUTE_TYPE_HINTS: Record<string, string> = {
  // Image attributes
  src: "string",
  alt: "string",
  width: "number | string | null",
  height: "number | string | null",

  // Table attributes
  colspan: "number",
  rowspan: "number",
  colwidth: "number[] | null",
  backgroundColor: "string | null",

  // Link attributes
  href: "string",
  target: "'_self' | '_blank' | '_parent' | '_top' | null",
  rel: "string | null",
  linktype: "'url' | 'story' | 'asset' | 'email'",
  uuid: "string | null",
  anchor: "string | null",

  // Text alignment
  textAlign: "'left' | 'center' | 'right' | 'justify' | null",

  // Heading level
  level: "1 | 2 | 3 | 4 | 5 | 6",

  // Common attributes
  id: "string | null",
  class: "string | null",
  title: "string | null",

  // Emoji attributes
  name: "string | null",
  emoji: "string | null",
  fallbackImage: "string | null",

  // Color attributes
  color: "string | null",

  // List attributes
  order: "number",
  start: "number",

  // Blok attributes
  body: "import('./types').BlokBody[]",

  // Image metadata
  source: "string | null",
  copyright: "string | null",
  meta_data: "Record<string, any> | null",
};

/**
 * Get type for an attribute, using hints first, then inference
 */
function getAttributeType(attrName: string, defaultValue: unknown, hasDefault: boolean): string {
  // Check hints first
  if (ATTRIBUTE_TYPE_HINTS[attrName]) {
    return ATTRIBUTE_TYPE_HINTS[attrName];
  }

  // Infer from default value
  if (hasDefault) {
    return getAttributeTypeFromDefault(attrName, defaultValue);
  }

  // Fallback for required attributes
  return inferRequiredType(attrName);
}

/**
 * Infer type from default value
 */
function getAttributeTypeFromDefault(attrName: string, value: unknown): string {
  if (value === null) {
    if (
      ["src", "href", "alt", "title", "linktype", "class", "target", "rel"].includes(attrName)
    ) {
      return "string | null";
    }
    if (["level"].includes(attrName)) {
      return "number | null";
    }
    return "unknown";
  }

  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";
  if (typeof value === "string") return "string";
  if (Array.isArray(value)) return "any[]";
  if (typeof value === "object") return "Record<string, any>";
  return "unknown";
}

/**
 * Fallback typing for required attributes (no default)
 */
function inferRequiredType(attrName: string): string {
  if (["src", "href", "alt", "title", "linktype", "class", "target", "rel"].includes(attrName))
    return "string";
  if (["level", "colspan", "rowspan", "start", "order"].includes(attrName)) return "number";
  return "unknown";
}

/**
 * Generate JSDoc comment for an attribute
 */
function generateAttrJSDoc(attrName: string, defaultValue: unknown): string {
  const docs: Record<string, string> = {
    level: "Heading level (1-6)",
    textAlign: "Text alignment direction",
    href: "Link URL or path",
    target: "Link target window",
    linktype: "Type of link (url, story, asset, email)",
    uuid: "Storyblok story UUID for internal links",
    anchor: "Anchor/hash for the link",
    colspan: "Number of columns this cell spans",
    rowspan: "Number of rows this cell spans",
    colwidth: "Column width(s) in pixels",
    backgroundColor: "Background color (CSS color string)",
    src: "Image source URL",
    alt: "Alternative text for accessibility",
    class: "CSS class name(s)",
    id: "Element ID",
    body: "Array of nested Storyblok components",
    emoji: "Emoji character",
    name: "Emoji name/identifier",
    fallbackImage: "Fallback image URL for emoji",
    color: "Text or highlight color",
  };

  const doc = docs[attrName];
  if (doc) {
    return `    /** ${doc} */\n`;
  }
  return "";
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

      const typeStr = getAttributeType(attrName, defaultValue, hasDefault);
      const optional = hasDefault && !isRequired;

      // Add JSDoc if available
      out += generateAttrJSDoc(attrName, defaultValue);
      out += `    '${attrName}'${optional ? "?" : ""}: ${typeStr};\n`;
    }

    out += `  };\n`;
  }

  return out;
}

function generateTypes() {
  const schema = getSchema(extensions as any);

  let output = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.\n`;
  output += `// Generated by: pnpm generate-types\n\n`;
  output += `import type { Node as PMNode, Mark as PMMark } from "@tiptap/pm/model";\n`;
  output += `import type { ParsedDOMSpec } from "./types.js";\n\n`;

  /**
   * Node attributes
   */
  output += `/**\n * Attribute types for all Tiptap node extensions.\n */\n`;
  output += `export interface TiptapNodeAttributes {\n`;
  output += generateAttributes(schema.nodes);
  output += `}\n\n`;

  /**
   * Mark attributes
   */
  output += `/**\n * Attribute types for all Tiptap mark extensions.\n */\n`;
  output += `export interface TiptapMarkAttributes {\n`;
  output += generateAttributes(schema.marks);
  output += `}\n\n`;

  /**
   * Helper types
   */
  output += `/** Union of all node type names */\n`;
  output += `export type TiptapNodeName = keyof TiptapNodeAttributes;\n\n`;
  output += `/** Union of all mark type names */\n`;
  output += `export type TiptapMarkName = keyof TiptapMarkAttributes;\n\n`;
  output += `/** Union of all component names (nodes + marks) */\n`;
  output += `export type TiptapComponentName = TiptapNodeName | TiptapMarkName;\n\n`;
  output += `/** Combined attributes map for all nodes and marks */\n`;
  output += `export type TiptapAllAttributes = TiptapNodeAttributes & TiptapMarkAttributes;\n\n`;

  /**
   * Unified Prop Helper
   */
  output += `/**
 * Framework-agnostic base props for any mapped RichText component.
 *
 * @template T - The node or mark type name (e.g., 'heading', 'bold', 'link')
 *
 * @example
 * // React component for heading
 * const Heading: React.FC<RichTextComponentProps<'heading'>> = ({ attrs, children }) => {
 *   const Tag = \`h\${attrs.level}\` as keyof JSX.IntrinsicElements;
 *   return <Tag style={{ textAlign: attrs.textAlign ?? undefined }}>{children}</Tag>;
 * };
 *
 * @example
 * // Vue component for link mark
 * defineProps<RichTextComponentProps<'link'>>();
 */
export type RichTextComponentProps<T extends TiptapComponentName> = {
  /**
   * The Tiptap extension attributes for this node/mark type.
   * Type-safe based on the template parameter T.
   */
  attrs: T extends TiptapNodeName
    ? TiptapNodeAttributes[T]
    : T extends TiptapMarkName
      ? TiptapMarkAttributes[T]
      : Record<string, any>;

  /**
   * The default DOM structure from Tiptap's toDOM() specification.
   * Useful for fallback rendering or extracting default element attributes.
   * Will be null for text nodes.
   */
  parsedDOM: ParsedDOMSpec | null;

  /**
   * Raw ProseMirror Node instance.
   * Only present for node components (not marks).
   * Provides access to node content, children, and advanced ProseMirror APIs.
   */
  node?: T extends TiptapNodeName ? PMNode : undefined;

  /**
   * Raw ProseMirror Mark instance.
   * Only present for mark components (not nodes).
   * Provides access to mark type and advanced ProseMirror APIs.
   */
  mark?: T extends TiptapMarkName ? PMMark : undefined;
};\n`;

  const outPath = path.join(
    __dirname,
    "../src/lib/richtext-renderer/core/tiptap-schema.generated.ts"
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
