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

/**
 * Mapping of Storyblok component names to Astro components.
 * Used for rendering `blok` nodes embedded in rich text.
 *
 * @example
 * ```astro
 * ---
 * import Feature from './Feature.astro';
 * import CTA from './CTA.astro';
 *
 * const blokComponents: BlokComponentMap = {
 *   feature: Feature,
 *   cta: CTA,
 * };
 * ---
 *
 * <RichTextRenderer doc={doc} blokComponents={blokComponents} />
 * ```
 */
export type BlokComponentMap = {
  [componentName: string]: any; // Astro components are opaque values
};

// Re-export type helpers for users building Astro custom components!
export type RichTextNodeProps<T extends TiptapComponentName> = RichTextComponentProps<T>;
export type RichTextMarkProps<T extends TiptapComponentName> = RichTextComponentProps<T>;
