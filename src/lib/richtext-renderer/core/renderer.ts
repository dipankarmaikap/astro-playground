import { Node as PMNode } from '@tiptap/pm/model';
import { getSchema, type AnyExtension } from '@tiptap/core';
import type { TiptapJSON, MarkMapItem, ParsedDOMSpec } from './types';
import { parseDOMSpec } from './parseDOMSpec';
import { defaultExtensions } from './extensions';

export class CoreRenderer {
  private schema: any;

  constructor(extensions: readonly AnyExtension[] = defaultExtensions) {
    // Generate the prose mirror schema from the provided Tiptap Extensions
    // Tiptap's getSchema takes a mutable array, but our defaultExtensions is `as const`
    this.schema = getSchema([...extensions]);
  }

  /**
   * Parse a raw Tiptap JSON document into a ProseMirror Node map
   */
  public parseDocument(json: TiptapJSON): PMNode {
    return PMNode.fromJSON(this.schema, json);
  }

  /**
   * Extracts the default structured DOM configuration for a Node
   */
  public getNodeDOMSpec(node: PMNode): ParsedDOMSpec | null {
    if (node.isText) return null; // Text nodes have no standard DOM spec wrapper typically
    if (!node.type.spec.toDOM) return null;
    
    // toDOM(node: Node) -> DOMOutputSpec
    const domSpecRaw = node.type.spec.toDOM(node);
    return parseDOMSpec(domSpecRaw);
  }

  /**
   * Extracts the structured default DOM configuration for a Mark
   */
  public getMarkDOMSpec(pmMark: any): ParsedDOMSpec | null {
    if (!pmMark.type.spec.toDOM) return null;
    // toDOM(mark: Mark, inline: boolean) -> DOMOutputSpec
    const domSpecRaw = pmMark.type.spec.toDOM(pmMark, false);
    return parseDOMSpec(domSpecRaw);
  }

  /**
   * Helper to format all marks applied to a specific Node
   */
  public getMarksForNode(node: PMNode): MarkMapItem[] {
    if (!node.marks || node.marks.length === 0) return [];

    return node.marks.map((pmMark) => {
      return {
        type: pmMark.type.name,
        attrs: pmMark.attrs,
        spec: this.getMarkDOMSpec(pmMark),
        pmMark
      };
    });
  }
}
