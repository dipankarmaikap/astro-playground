import type { 
  RichTextComponentProps, 
  StoryblokRichTextComponentMap, 
  TiptapComponentName,
} from "@storyblok/richtext/static"
import type { AstroComponentFactory } from "astro/runtime/server/index.js";


// ============================================================================
// Astro Types
// ============================================================================

/**
 * Astro component type that can be used in richtext rendering
 */
export type AstroComponent = AstroComponentFactory;

/**
 * Type-safe component map for Astro richtext renderer
 * Uses AstroComponentFactory for proper Astro component typing
 */
export type SBAstroComponentMap = 
  StoryblokRichTextComponentMap<AstroComponent, Record<string, unknown>>;

/**
 * Extended Astro-specific props with components passthrough.
 * Uses the library's RichTextComponentProps but with Astro-specific generics.
 */
export type SBAstroRichTextComponentProps<T extends TiptapComponentName> = 
  RichTextComponentProps<T, AstroComponent, Record<string, unknown>>;

/**
 * Type guard to check if a resolved component is a valid Astro component
 */
export function isValidAstroComponent(
  component: unknown
): component is AstroComponent {
  return (
    typeof component === 'function' ||
    (typeof component === 'object' && 
     component !== null && 
     'isAstroComponentFactory' in component)
  );
}
