import type { Node as PMNode, Mark as PMMark } from '@tiptap/pm/model';

/**
 * Tiptap JSON Document node shape
 */
export interface TiptapJSON {
  type: string;
  attrs?: Record<string, any>;
  content?: TiptapJSON[];
  marks?: Array<{
    type: string;
    attrs?: Record<string, any>;
  }>;
  text?: string;
  [key: string]: any;
}

/**
 * Parsed DOM Output Specification for a Node or Mark
 */
export interface ParsedDOMSpec {
  tag: string;
  attrs: Record<string, string>;
  hasHole: boolean;
  contents: ParsedDOMSpec | string | null;
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

import type { SupportedComponentNames, GetAttributes } from './extensions';

/**
 * Abstract properties passed to ANY custom node component
 * Frameworks will map this to their specific prop systems
 */
export interface NodeComponentProps<T extends string = string> {
  node: PMNode;
  attrs: GetAttributes<T>;
  parsedDOM: ParsedDOMSpec | null; // The default DOM tag/attrs from Tiptap schema
}

/**
 * Abstract properties passed to ANY custom mark component
 */
export interface MarkComponentProps<T extends string = string> {
  mark: PMMark;
  attrs: GetAttributes<T>;
  parsedDOM: ParsedDOMSpec | null;
}

/**
 * Core rendering mapping for custom components.
 * By defining it as a `Partial<Record<SupportedComponentNames, T>>`,
 * IDEs will provide autocomplete for exactly the node/mark names from Tiptap!
 */
export type FrameworkComponentMap<T = any> = Partial<
  Record<SupportedComponentNames, T>
>;
