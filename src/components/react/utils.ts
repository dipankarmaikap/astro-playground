import type { RichTextComponentProps, StoryblokRichTextComponentMap, TiptapComponentName } from "@storyblok/richtext/static";
import type { ComponentType, ReactNode } from "react";

// ============================================================================
// React Types
// ============================================================================

/**
 * Type-safe component map for React richtext renderer
 */
export type SBReactComponentMap = 
  StoryblokRichTextComponentMap<ReactNode, Record<string, unknown>>;

/**
 * Extended React-specific props with children support for custom components.
 * Uses the library's RichTextComponentProps but with React-specific generics.
 */
export type SBReactRichTextComponentProps<T extends TiptapComponentName> = 
  RichTextComponentProps<T, ReactNode, Record<string, unknown>> & {
    children?: ReactNode;
  };

/**
 * Type guard to check if a resolved component is a valid React component
 */
export function isValidReactComponent(component: unknown): component is ComponentType<Record<string, unknown>> {
    return (
        typeof component === 'function' ||
        (typeof component === 'object' && component !== null && '$$typeof' in component)
    );
}
