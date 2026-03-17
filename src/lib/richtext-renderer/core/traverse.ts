/**
 * core/traverse.ts — Framework-agnostic traversal system for rich text rendering.
 *
 * This module provides a shared traversal logic that all framework adapters can use,
 * ensuring consistent behavior across React, Vue, Astro, and future frameworks.
 */

import type { Node as PMNode, Mark as PMMark } from "@tiptap/pm/model";
import type { JSONContent } from "@tiptap/core";
import type { CoreRenderer } from "./renderer";
import type { MarkMapItem, ParsedDOMSpec, BlokBody } from "./types";

/**
 * Options for rich text traversal
 */
export interface TraversalOptions<TElement> {
  /**
   * Called when a `blok` node is encountered.
   * Return the rendered component(s) for the blok body items.
   */
  blokResolver?: (bloks: BlokBody[], key: string) => TElement | null;
}

/**
 * Props passed to custom node components
 */
export interface NodeComponentProps {
  node: PMNode;
  attrs: Record<string, any>;
  parsedDOM: ParsedDOMSpec | null;
}

/**
 * Props passed to custom mark components
 */
export interface MarkComponentProps {
  mark: PMMark;
  attrs: Record<string, any>;
  parsedDOM: ParsedDOMSpec | null;
}

/**
 * Framework adapter interface.
 * Each framework implements these methods to handle element creation.
 */
export interface FrameworkAdapter<TElement, TComponentMap> {
  /**
   * Create a text element from plain text content
   */
  createText(text: string, key: string): TElement;

  /**
   * Create a fragment (wrapper for multiple elements)
   */
  createFragment(children: TElement[], key?: string): TElement;

  /**
   * Render a node using a custom component from the component map
   */
  renderCustomNode(
    component: any,
    props: NodeComponentProps,
    children: TElement[],
    key: string
  ): TElement;

  /**
   * Render a mark using a custom component from the component map
   */
  renderCustomMark(
    component: any,
    props: MarkComponentProps,
    child: TElement,
    key: string
  ): TElement;

  /**
   * Render an element using the default DOM spec from Tiptap's toDOM()
   */
  renderDOMSpec(
    spec: ParsedDOMSpec,
    children: TElement[],
    key: string
  ): TElement;

  /**
   * Get a component from the component map by name
   * Returns undefined if no custom component is registered for this name
   */
  getComponent(componentMap: TComponentMap, name: string): any | undefined;
}

/**
 * Traverse a document and render it using the provided adapter.
 * Returns an array of rendered top-level elements.
 */
export function traverseDocument<TElement, TComponentMap>(
  doc: JSONContent,
  renderer: CoreRenderer,
  componentMap: TComponentMap,
  adapter: FrameworkAdapter<TElement, TComponentMap>,
  options?: TraversalOptions<TElement>
): TElement[] {
  const pmDoc = renderer.parseDocument(doc);
  const result: TElement[] = [];

  pmDoc.forEach((node, _offset, index) => {
    result.push(
      traverseNode(node, renderer, componentMap, adapter, index, "root", options)
    );
  });

  return result;
}

/**
 * Recursively traverse and render a single ProseMirror node.
 */
export function traverseNode<TElement, TComponentMap>(
  node: PMNode,
  renderer: CoreRenderer,
  componentMap: TComponentMap,
  adapter: FrameworkAdapter<TElement, TComponentMap>,
  index: number,
  keyPath: string,
  options?: TraversalOptions<TElement>
): TElement {
  const activeKey = `${keyPath}-${index}`;

  // Get DOM spec and marks for this node
  const domSpec = renderer.getNodeDOMSpec(node);
  const markDefs = renderer.getMarksForNode(node);

  // Recursively render children
  const children: TElement[] = [];
  node.forEach((childNode, _offset, childIndex) => {
    children.push(
      traverseNode(childNode, renderer, componentMap, adapter, childIndex, activeKey, options)
    );
  });

  // Render the node element
  let nodeElement: TElement;

  if (node.isText) {
    // Plain text node
    nodeElement = adapter.createText(node.text || "", activeKey);
  } else if (node.type.name === "blok" && options?.blokResolver) {
    // Blok node with resolver
    const resolved = options.blokResolver(node.attrs.body || [], activeKey);
    nodeElement = resolved ?? adapter.createFragment([], activeKey);
  } else {
    // Check for custom component
    const CustomComponent = adapter.getComponent(componentMap, node.type.name);

    if (CustomComponent) {
      // Render with custom component
      nodeElement = adapter.renderCustomNode(
        CustomComponent,
        {
          node,
          attrs: node.attrs,
          parsedDOM: domSpec,
        },
        children,
        `node-${node.type.name}-${activeKey}`
      );
    } else if (domSpec) {
      // Render with default DOM spec
      nodeElement = adapter.renderDOMSpec(
        domSpec,
        children,
        `node-${node.type.name}-${activeKey}`
      );
    } else {
      // No spec (e.g., document root) - render children directly
      nodeElement = adapter.createFragment(children, activeKey);
    }
  }

  // Wrap with marks (innermost first, so we reduceRight)
  return wrapWithMarks(nodeElement, markDefs, componentMap, adapter, activeKey);
}

/**
 * Wrap an element with its marks, from innermost to outermost.
 */
function wrapWithMarks<TElement, TComponentMap>(
  element: TElement,
  marks: MarkMapItem[],
  componentMap: TComponentMap,
  adapter: FrameworkAdapter<TElement, TComponentMap>,
  keyPath: string
): TElement {
  return marks.reduceRight((acc, markDef, idx) => {
    const markKey = `mark-${markDef.type}-${keyPath}-${idx}`;
    const CustomMark = adapter.getComponent(componentMap, markDef.type);

    if (CustomMark) {
      return adapter.renderCustomMark(
        CustomMark,
        {
          mark: markDef.pmMark,
          attrs: markDef.attrs,
          parsedDOM: markDef.spec,
        },
        acc,
        markKey
      );
    }

    if (markDef.spec) {
      return adapter.renderDOMSpec(markDef.spec, [acc], markKey);
    }

    // No spec for this mark - pass through unchanged
    return acc;
  }, element);
}

/**
 * Helper to collect child nodes from a ProseMirror node
 */
export function collectChildNodes(node: PMNode): Array<{ node: PMNode; index: number }> {
  const result: Array<{ node: PMNode; index: number }> = [];
  node.forEach((child, _, index) => {
    result.push({ node: child, index });
  });
  return result;
}
