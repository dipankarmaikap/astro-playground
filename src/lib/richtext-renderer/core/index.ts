/**
 * core/index.ts — Main entry point for the richtext-renderer core module.
 *
 * Re-exports all public APIs for cleaner imports.
 *
 * @example
 * ```ts
 * import { CoreRenderer, parseDOMSpec, type BlokBody } from '@storyblok/richtext-renderer/core';
 * ```
 */

// Core renderer
export { CoreRenderer, VOID_ELEMENTS } from './renderer';

// DOM spec parsing
export { parseDOMSpec } from './parseDOMSpec';

// Attribute utilities
export { normalizeDOMAttrs, convertStyleString, CSS_AS_STYLE_ATTRS } from './attrs';

// Traversal system
export {
  traverseDocument,
  traverseNode,
  collectChildNodes,
  type FrameworkAdapter,
  type TraversalOptions,
  type NodeComponentProps,
  type MarkComponentProps,
} from './traverse';

// Types
export type {
  JSONContent,
  ParsedDOMSpec,
  MarkMapItem,
  BlokBody,
  RenderOptions,
} from './types';

// Generated schema types
export type {
  TiptapNodeAttributes,
  TiptapMarkAttributes,
  TiptapNodeName,
  TiptapMarkName,
  TiptapComponentName,
  TiptapAllAttributes,
  RichTextComponentProps,
} from './tiptap-schema.generated';

