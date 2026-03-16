import type { TiptapComponentName, RichTextComponentProps as BaseRichTextComponentProps } from "../core/tiptap-schema.generated";

/**
 * Strict Astro unified component props.
 */
export type RichTextComponentProps<T extends TiptapComponentName> = 
  BaseRichTextComponentProps<T>;

/**
 * Strict mapping of Astro components to available Tiptap Nodes and Marks.
 */
export type ComponentMap = {
  [K in TiptapComponentName]?: any; // Astro components are opaque values; typed as any
};

// Re-export type helpers for users building Astro custom components!
export type RichTextNodeProps<T extends TiptapComponentName> = RichTextComponentProps<T>;
export type RichTextMarkProps<T extends TiptapComponentName> = RichTextComponentProps<T>;
