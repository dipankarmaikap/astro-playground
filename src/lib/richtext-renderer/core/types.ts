import type { Node as PMNode, Mark as PMMark } from '@tiptap/pm/model';
import type { JSONContent } from '@tiptap/core';

export type { JSONContent };

/**
 * Parsed DOM Output Specification for a Node or Mark
 */
export interface ParsedDOMSpec {
  tag: string;
  attrs: Record<string, any>;
  hasHole: boolean;
  children: Array<ParsedDOMSpec | string | { hole: true }>;
}

/**
 * Represents a single mark wrapping the contents
 */
export interface MarkMapItem {
  type: string;
  attrs: Record<string, any>;
  spec: ParsedDOMSpec | null;
  pmMark: PMMark;
}

/**
 * Blok body item - represents a Storyblok component embedded in rich text.
 * This is the structure of items in the `body` array of a `blok` node.
 */
export interface BlokBody {
  /** Unique identifier for this component instance */
  _uid: string;
  /** Component type name (e.g., 'feature', 'cta', 'hero') */
  component: string;
  /** Additional component props */
  [key: string]: any;
}

/**
 * Options for rich text rendering
 */
export interface RenderOptions<TElement = any> {
  /** 
   * Called when a `blok` node is encountered.
   * Return the rendered component(s) for the blok body items.
   */
  blokResolver?: (bloks: BlokBody[], key: string) => TElement | null;
}

