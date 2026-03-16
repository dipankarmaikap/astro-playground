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

