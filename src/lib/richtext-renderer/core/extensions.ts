import { defaultExtensions as tiptapExtentions } from "./tiptap-extensions";

export const defaultExtensions = Object.values(tiptapExtentions);

// -----------------------------------------------------------------------------
// Magical Type Utility Extractors!
// -----------------------------------------------------------------------------

// Given an array of Tiptap Extensions, pull out all valid Node or Mark names
export type ExtractExtensionNames<T extends ReadonlyArray<any>> = {
  [K in keyof T]: T[K] extends { name: infer N }
    ? N extends string
      ? N
      : never
    : never;
}[number];

export type SupportedComponentNames =
  | ExtractExtensionNames<typeof defaultExtensions>
  | "paragraph"
  | "text"
  | "heading"
  | "bulletList"
  | "orderedList"
  | "listItem"
  | "blockquote"
  | "codeBlock"
  | "hardBreak"
  | "horizontalRule"
  | "bold"
  | "code"
  | "italic"
  | "strike";

/**
 * Type utility to extract the exactly correct attributes interface for a given Tiptap Node/Mark
 * purely based on the defaultExtensions array! No hardcoding required!
 */
/**
 * Given a Node/Mark string name (e.g. 'heading' or 'link'), automatically extract its option payload
 * if it exists in our default extensions. Fallback to generic Record if it's a bundled StarterKit primitive
 * that's harder to unpack.
 *
 * Note: We cannot dynamically infer this from Tiptap Extension classes because Tiptap's Typescript
 * interfaces represent Editor configuration options (e.g. `openOnClick: boolean`), not the serialized
 * JSON representation of the Node/Mark (e.g. `{ href: string, target: string }`).
 */
export type GetAttributes<T extends string> = T extends "heading"
  ? { level: 1 | 2 | 3 | 4 | 5 | 6 }
  : T extends "link"
    ? { href: string; target?: string; class?: string }
    : T extends "image"
      ? { src: string; alt?: string; title?: string }
      : T extends "taskItem"
        ? { checked: boolean }
        : Record<string, any>; // Fallback generic attrs
